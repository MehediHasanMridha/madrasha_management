<?php
namespace App\Http\Controllers;

use App\Models\ExpenseLog;
use App\Models\FeeType;
use App\Models\IncomeLog;
use App\Models\PaymentMethod;
use App\Models\StudentDiscount;
use App\Models\StudentDue;
use App\Models\Transaction;
use App\Models\User;
use App\Models\VoucherType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FinanceController extends Controller
{
    /**
     * Display the finance summary dashboard.
     *
     * @return \Inertia\Response
     */
    public function summary($period = null)
    {
        $earningMonth  = request()->input('earningMonth');
        $earningYear   = request()->input('earningYear');
        $outgoingMonth = request()->input('outgoingMonth');
        $outgoingYear  = request()->input('outgoingYear');

        // how to convert month & year to Y-m
        $period = date('Y-m', strtotime($earningMonth . ' ' . $earningYear));
        $date   = date('Y-m', strtotime($outgoingMonth . ' ' . $outgoingYear));
        // If no period is provided, use the current month
        if (! $period) {
            $period = date('Y-m');
        }
        if (! $date) {
            $date = date('Y-m');
        }

        // Mock data for demonstration
        $earnings = IncomeLog::with('feeType')
            ->where('status', 'paid')
            ->where('payment_period', $period)
            ->groupBy('fee_type_id')
            ->selectRaw('fee_type_id, sum(amount) as amount')
            ->get()
            ->map(function ($item) {
                return [
                    'feeType' => $item->feeType->name ?? 'Unknown',
                    'amount'  => $item->amount,
                ];
            });

        $outgoings = ExpenseLog::with('voucherType')
            ->where('date', 'like', $date . '%') // get all vouchers for the month but date is "2025-04-22" format
            ->groupBy('voucher_type_id')
            ->selectRaw('voucher_type_id, sum(amount) as amount')
            ->get()
            ->map(function ($item) {
                return [
                    'voucherType' => $item->voucherType->name ?? 'Unknown',
                    'amount'      => $item->amount,
                ];
            });

        // return $outgoings;
        $data = [
            'remaining_amount' => 234567,
            'earnings'         => $earnings,
            'expenses'         => $outgoings,
        ];

        return Inertia::render('Finance/Summary', [
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
        return Inertia::render('Finance/Earnings');
    }

    /**
     * Display the outgoings/expenses page.
     *
     * @return \Inertia\Response
     */
    public function outgoings()
    {
        return Inertia::render('Finance/Outgoings');
    }

    /**
     * Display the monthly reports page.
     *
     * @return \Inertia\Response
     */
    public function monthlyReports()
    {
        return Inertia::render('Finance/MonthlyReports');
    }

    public function get_user_data($user_id)
    {

        if (request()->input('type') == 'staff') {
            $user = User::whereHas('roles', fn($q) => $q->where('name', 'staff'))->where('unique_id', $user_id)->with('academics')->firstOrFail();

            return response()->json([
                'id'        => $user->id,
                'name'      => $user->name,
                'email'     => $user->email,
                'phone'     => $user->phone,
                'image'     => $user->img,
                'unique_id' => $user->unique_id,
                'salary'    => $user->academics->salary,
            ]);

        }
        $year = request()->input('year') ?? date('Y');
        // find user by id
        $user = User::with([
            'incomeLogs'  =>
            function ($q) use ($year) {
                $q->where('payment_period', 'like', $year . '%')->with('feeType');
            },
            'studentDues' =>
            function ($q) use ($year) {
                $q->where('due_period', 'like', $year . '%')->with('feeType');
            },
        ])
            ->whereHas('roles', fn($q) => $q->where('name', 'student'))
            ->where('unique_id', $user_id)
            ->firstOrFail();

        // return $user;
        return response()->json([
            'id'           => $user->id,
            'name'         => $user->name,
            'email'        => $user->email,
            'phone'        => $user->phone,
            'image'        => $user->img,
            'unique_id'    => $user->unique_id,
            'boarding_fee' => round(getStudentFee($user->id, 'boarding'), 2),
            'academic_fee' => round(getStudentFee($user->id, 'academic'), 2),
            'income_logs'  => $user->incomeLogs->groupBy(fn($item) => date('F', strtotime($item->payment_period)))
                ->map(fn($group, $month) => [
                    'month' => $month,
                    'fee'   => $group->map(fn($item) => [
                        'amount' => round($item->amount, 2),
                        'type'   => $item->feeType->slug ?? 'Unknown',
                    ])->values(),
                ])->values(),
            'dues'         => $user->studentDues->groupBy(fn($item) => date('F', strtotime($item->due_period)))
                ->map(fn($group, $month) => [
                    'month' => $month,
                    'fee'   => $group->map(fn($item) => [
                        'due_amount' => round($item->due_amount, 2),
                        'type'       => $item->feeType->slug ?? 'Unknown',
                    ])->values(),
                ])->values(),
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
                $total_fee                   = $request->academic_fee + $request->boarding_fee;
                $transaction                 = new Transaction();
                $transaction->transaction_id = 'TRN-' . str_pad(mt_rand(1, 999999999), 9, '0', STR_PAD_LEFT);
                $transaction->user_id        = $student->id;
                $transaction->amount         = $total_fee;
                $transaction->note           = $request->details ?? null;
                $transaction->save();

                if ($request->discount) {
                    $discount          = new StudentDiscount();
                    $discount->user_id = $student->id;
                    $discount->amount  = $request->discount;
                    $discount->save();
                }

                $academic_divider  = ($request->academic_fee / $student->academics->academic_fee) | 0;
                $academic_division = $request->academic_fee % $student->academics->academic_fee | 0;
                $boarding_divider  = ($request->boarding_fee / $student->academics->boarding_fee) | 0;
                $boarding_division = $request->boarding_fee % $student->academics->boarding_fee | 0;
                // dd($academic_divider, $academic_division, $boarding_divider, $boarding_division);
                $year        = $request->year;
                $monthlyInfo = collect($request->monthlyInfo);
                $monthlyInfo->map(function ($item, $key) use ($academic_divider, $academic_division, $boarding_divider, $boarding_division, $student, $year) {
                    $month        = $year . '-' . $item['month'];
                    $month        = date('Y-m', strtotime($month));
                    $academic_fee = $key < $academic_divider ? $item['academic_fee'] : $academic_division;
                    $boarding_fee = $key < $boarding_divider ? $item['boarding_fee'] : $boarding_division;
                    if ($academic_fee === $item['academic_fee']) {
                        IncomeLog::create([
                            'user_id'           => $student->id,
                            'amount'            => $academic_fee,
                            'fee_type_id'       => FeeType::where('name', 'like', '%academic%')->first()->id, // get from fee_types table
                            'payment_method_id' => PaymentMethod::where('slug', 'cash')->first()->id,         // get from payment_methods table
                            'status'            => 'paid',
                            'payment_period'    => $month,
                            'receiver_id'       => Auth::user()->id,
                        ]);
                    } else {
                        IncomeLog::create([
                            'user_id'           => $student->id,
                            'amount'            => $academic_fee,
                            'fee_type_id'       => FeeType::where('name', 'like', '%academic%')->first()->id, // get from fee_types table
                            'payment_method_id' => PaymentMethod::where('slug', 'cash')->first()->id,         // get from payment_methods table
                            'status'            => 'paid',
                            'payment_period'    => $month,
                            'receiver_id'       => Auth::user()->id,
                        ]);

                        StudentDue::create([
                            'user_id'         => $student->id,
                            'fee_type_id'     => FeeType::where('name', 'like', '%academic%')->first()->id, // get from fee_types table
                            'paid_amount'     => $academic_fee,
                            'due_period'      => $month,
                            'expected_amount' => $item['academic_fee'],
                        ]);
                    }

                    if ($boarding_fee === $item['boarding_fee']) {
                        IncomeLog::create([
                            'user_id'           => $student->id,
                            'amount'            => $boarding_fee,
                            'fee_type_id'       => FeeType::where('name', 'like', '%boarding%')->first()->id, // get from fee_types table
                            'payment_method_id' => PaymentMethod::where('slug', 'cash')->first()->id,         // get from payment_methods table
                            'status'            => 'paid',
                            'payment_period'    => $month,
                            'receiver_id'       => Auth::user()->id,
                        ]);
                    } else {
                        IncomeLog::create([
                            'user_id'           => $student->id,
                            'amount'            => $boarding_fee,
                            'fee_type_id'       => FeeType::where('name', 'like', '%boarding%')->first()->id, // get from fee_types table
                            'payment_method_id' => PaymentMethod::where('slug', 'cash')->first()->id,         // get from payment_methods table
                            'status'            => 'paid',
                            'payment_period'    => $month,
                            'receiver_id'       => Auth::user()->id,
                        ]);
                        StudentDue::create([
                            'user_id'         => $student->id,
                            'fee_type_id'     => FeeType::where('name', 'like', '%boarding%')->first()->id, // get from fee_types table
                            'paid_amount'     => $boarding_fee,
                            'due_period'      => $month,
                            'expected_amount' => $item['boarding_fee'],
                        ]);
                    }
                });

                return to_route('finance.earnings')->with('success', 'Money added successfully');

            }

        } catch (\Throwable $th) {
            return redirect()->back()->with('error', "You have already added this month fee");
        }

    }
    public function add_voucher(Request $request)
    {
        // dd($request->all());
        // Validate the request data
        $request->validate([
            'staff_id' => 'required|exists:users,unique_id',
            'month'    => 'required|in:January,February,March,April,May,June,July,August,September,October,November,December', // 'January',
            'type'     => 'required|in:salary',
            'note'     => 'nullable|string|max:255',
        ]);

        // Find the student by unique_id
        $staff = User::where('unique_id', $request->staff_id)->first();

        if (! $staff) {
            return response()->json(['error' => 'Staff not found'], 404);
        }

        // convert date to 2025-04-22
        $date = date('Y-m-d', strtotime($request->month));

        if ($request->type == 'salary') {

            ExpenseLog::create([
                'user_id'         => $staff->id,
                'voucher_type_id' => VoucherType::where('name', 'like', '%salary%')->first()->id, // get from fee_types table
                'date'            => $date,
                'amount'          => $request->salary,
            ]);

            // return response
            return to_route('finance.outgoings')->with('success', 'Voucher added successfully');

        }

    }

}
