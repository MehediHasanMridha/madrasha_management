<?php
namespace App\Http\Controllers;

use App\Actions\Finance\Expense\AddOthersVoucher;
use App\Actions\Finance\Expense\AddSalaryVoucher;
use App\Actions\Finance\Expense\Expense;
use App\Actions\Finance\Expense\VoucherList;
use App\Actions\Finance\Reports\MonthlyDailyReport;
use App\Actions\Finance\Reports\MonthlyGroupReport;
use App\Actions\Finance\Summary;
use App\Models\ExpenseLog;
use App\Models\FeeType;
use App\Models\IncomeLog;
use App\Models\PaymentMethod;
use App\Models\StudentDiscount;
use App\Models\StudentDue;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class FinanceController extends Controller
{
    /**
     * Display the finance summary dashboard.
     *
     * @return \Inertia\Response
     */
    public function summary()
    {
        $month = request()->input('month');
        $year  = request()->input('year');

        $data = Summary::run($month, $year);

        return Inertia::render('admin::finance/summary', [
            'data' => $data,
        ]);
    }

    /**
     * Display the earnings page.
     *
     * @return \Inertia\Response
     */
    public function earnings()
    {
        return Inertia::render('admin::finance/earnings');
    }

    /**
     * Display the outgoings/expenses page.
     *
     * @return \Inertia\Response
     */
    public function outgoings()
    {
        $month = request()->input('month');
        $year  = request()->input('year');

        $outgoings   = Expense::run($month, $year);
        $voucherList = VoucherList::run($month, $year);

        return Inertia::render('admin::finance/outgoings',
            [
                'outgoings'   => $outgoings,
                'voucherList' => $voucherList,
            ]
        );
    }

    /**
     * Display the monthly reports page.
     *
     * @return \Inertia\Response
     */
    public function reports()
    {
        $monthly = MonthlyGroupReport::make();
        // dd($monthly->handle());
        return Inertia::render('admin::finance/reports/index');
    }
    public function daily_report()
    {
        $month = request()->input('month');
        $year  = request()->input('year');
        // $day   = MonthlyDailyReport::run($month, $year);
        // dd($monthly->handle());
        return Inertia::render('admin::finance/reports/dailyReport');
    }

    public function get_user_data($user_id)
    {

        $year = request()->input('year') ?? date('Y');
        if (request()->input('type') == 'staff') {
            $user = User::with(['academics', 'expenseLogs' => function ($q) use ($year) {
                $q->whereYear('date', $year);
            }])->whereHas('roles', fn($q) => $q->where('name', 'staff'))->where('unique_id', $user_id)->firstOrFail();

            return response()->json([
                'id'        => $user->id,
                'year'      => $year,
                'name'      => $user->name,
                'email'     => $user->email,
                'phone'     => $user->phone,
                'image'     => $user->img,
                'unique_id' => $user->unique_id,
                'salary'    => $user->academics->salary,
                'expenses'  => $user->expenseLogs->map(function ($item) {
                    return [
                        'amount' => round($item->amount, 2),
                        'type'   => $item->voucherType->slug ?? 'Unknown',
                        'month'  => date('F', strtotime($item->date)),
                    ];
                })->groupBy('month')->map(function ($group, $month) {
                    return [
                        'month' => $month,
                        'fees'  => $group,
                    ];
                })->values(),
            ]);
        }
        // find user by id
        $user = User::with([
            'incomeLogs' =>
            function ($q) use ($year) {
                $q->where('payment_period', 'like', $year . '%')
                    ->with(['feeType', 'studentDue' => function ($q) {
                        $q->select('income_log_id', 'due_amount');
                    }]);
            },
        ])->whereHas('roles', fn($q) => $q->where('name', 'student'))
            ->where('unique_id', $user_id)
            ->firstOrFail();

        return response()->json([
            'id'           => $user->id,
            'name'         => $user->name,
            'email'        => $user->email,
            'phone'        => $user->phone,
            'image'        => $user->img,
            'unique_id'    => $user->unique_id,
            'department'   => $user->academics->department->name ?? null,
            'boarding_fee' => round(getStudentFee($user->id, 'boarding'), 2),
            'academic_fee' => round(getStudentFee($user->id, 'academic'), 2),
            'income_logs'  => $user->incomeLogs->map(function ($item) {
                return [
                    'amount' => round($item->amount, 2),
                    'type'   => $item->feeType->slug ?? 'Unknown',
                    'due'    => $item->studentDue ? round($item->studentDue->due_amount, 2) : 0,
                    'month'  => date('F', strtotime($item->payment_period)),
                ];
            })->groupBy('month')->map(function ($group, $month) {
                return [
                    'month' => $month,
                    'fees'  => $group,
                ];
            })->values(),

        ]);
    }

    public function add_money(Request $request)
    {

        try {
            // Validate the request data
            $request->validate([
                'student_id' => 'required|exists:users,unique_id',
                'type'       => 'required|in:monthly_fee,exam_fee,others_fee',
                'note'       => 'nullable|string|max:255',
            ]);

            // Find the student by unique_id
            $student = User::with('academics')->where('unique_id', $request->student_id)->first();
            if (! $student) {
                return response()->json(['error' => 'Student not found'], 404);
            }

            // convert month to 2025-04

            if ($request->type == 'monthly_fee') {

                // if fee_type is not in fee_types table then create it

                $total_fee                   = $request->academic_fee + $request->boarding_fee;
                $transaction                 = new Transaction();
                $transaction->transaction_id = 'TRN-' . str_pad(mt_rand(1, 999999999), 9, '0', STR_PAD_LEFT);
                $transaction->user_id        = Auth::user()->id;
                $transaction->amount         = $total_fee;
                $transaction->note           = $request->details ?? null;
                $transaction->save();

                if ($request->discount) {
                    $discount          = new StudentDiscount();
                    $discount->user_id = $student->id;
                    $discount->amount  = $request->discount;
                    $discount->save();
                }
                $academic_fee_base = getStudentFee($student->id, 'academic');
                $boarding_fee_base = getStudentFee($student->id, 'boarding');
                $academic_divider  = ($academic_fee_base > 0) ? intval($request->academic_fee / $academic_fee_base) : 0;
                $academic_division = ($academic_fee_base > 0) ? ($request->academic_fee % $academic_fee_base) : 0;

                $boarding_divider  = ($boarding_fee_base > 0) ? intval($request->boarding_fee / $boarding_fee_base) : 0;
                $boarding_division = ($boarding_fee_base > 0) ? ($request->boarding_fee % $boarding_fee_base) : 0;

                $year = $request->year;

                $monthlyInfo = collect($request->monthlyInfo);
                $monthlyInfo->map(function ($item, $key) use ($student, $academic_divider, $academic_division, $boarding_divider, $boarding_division, $year) {
                    $month        = $year . '-' . $item['month'];
                    $month        = date('Y-m', strtotime($month));
                    $academic_fee = $key < $academic_divider ? $item['academic_fee'] : ($key === $academic_divider ? $academic_division : 0);
                    $boarding_fee = $key < $boarding_divider ? $item['boarding_fee'] : ($key === $boarding_divider ? $boarding_division : 0);
                    if ($academic_fee === $item['academic_fee']) {
                        IncomeLog::create([
                            'user_id'           => $student->id,
                            'amount'            => $academic_fee,
                            'fee_type_id'       => FeeType::where('slug', 'like', "%academic%", 'and')->first()->id,                              // get from fee_types table
                            'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
                            'status'            => 'paid',
                            'payment_period'    => $month,
                            'receiver_id'       => Auth::user()->id,
                        ]);
                    } else {
                        $incomeLog = IncomeLog::create([
                            'user_id'           => $student->id,
                            'amount'            => $academic_fee,
                            'fee_type_id'       => FeeType::where('slug', 'like', "%academic%", 'and')->first()->id,                              // get from fee_types table
                            'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
                            'status'            => 'paid',
                            'payment_period'    => $month,
                            'receiver_id'       => Auth::user()->id,
                        ]);

                        StudentDue::create([
                            'income_log_id' => $incomeLog->id,
                            'due_amount'    => $item['academic_fee'] - $academic_fee,
                        ]);
                    }

                    if ($boarding_fee === $item['boarding_fee']) {
                        IncomeLog::create([
                            'user_id'           => $student->id,
                            'amount'            => $boarding_fee,
                            'fee_type_id'       => FeeType::where('slug', 'like', "%boarding%", 'and')->first()->id,                              // get from fee_types table
                            'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
                            'status'            => 'paid',
                            'payment_period'    => $month,
                            'receiver_id'       => Auth::user()->id,
                        ]);
                    } else {
                        $incomeLog = IncomeLog::create([
                            'user_id'           => $student->id,
                            'amount'            => $boarding_fee,
                            'fee_type_id'       => FeeType::where('slug', 'like', "%boarding%", 'and')->first()->id,                              // get from fee_types table
                            'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
                            'status'            => 'paid',
                            'payment_period'    => $month,
                            'receiver_id'       => Auth::user()->id,
                        ]);
                        StudentDue::create([
                            'income_log_id' => $incomeLog->id,
                            'due_amount'    => $item['boarding_fee'] - $boarding_fee,
                        ]);
                    }
                });

                return to_route('finance.earnings')->with('success', 'Money added successfully');

            }

        } catch (\Throwable $th) {
            Log::error('Error adding money: ' . $th->getMessage());
            return redirect()->back()->with('error', "You have already added this month fee");
        }

    }
    public function add_voucher(Request $request)
    {
        $request->validate([
            'type' => 'required',
            'note' => 'nullable|string|max:255',
        ]);

        if ($request->type == 'salary' && $request->monthlyInfo) {

            AddSalaryVoucher::run($request);
            return to_route('finance.outgoings')->with('success', 'Voucher added successfully');
        }

        AddOthersVoucher::run($request);
        return to_route('finance.outgoings')->with('success', 'Voucher added successfully');

    }

    public function daily_report_data()
    {
        $month = request()->input('month');
        $day   = request()->input('day');
        $year  = request()->input('year') ?? date('Y');
        $data  = MonthlyDailyReport::run($day, $month, $year);
        return response()->json($data);
    }

    // delete voucher
    public function delete_voucher($voucher_id)
    {

        // delete ExpenseLog
        $expenseLog = ExpenseLog::find($voucher_id);
        if ($expenseLog) {
            $expenseLog->delete();
            return to_route('finance.outgoings')->with('success', 'Voucher deleted successfully');
        }
        return response()->json(['error' => 'Voucher not found'], 404);
    }

}
