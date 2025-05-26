<?php
namespace App\Http\Controllers;

use App\Actions\Finance\Due\DueFilterGroup;
use App\Actions\Finance\Due\DueList;
use App\Actions\Finance\Earning\AddMonthlyFee;
use App\Actions\Finance\Earning\MonthlyDiscount;
use App\Actions\Finance\Earning\MonthlyTransaction;
use App\Actions\Finance\Expense\AddOthersVoucher;
use App\Actions\Finance\Expense\AddSalaryVoucher;
use App\Actions\Finance\Expense\Expense;
use App\Actions\Finance\Expense\VoucherList;
use App\Actions\Finance\Reports\MonthlyDailyReport;
use App\Actions\Finance\Reports\MonthlyGroupReport;
use App\Actions\Finance\Summary;
use App\Models\ExpenseLog;
use App\Models\FeeType;
use App\Models\StudentDue;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

        // return $user;

        return response()->json([
            'id'           => $user->id,
            'name'         => $user->name,
            'email'        => $user->email,
            'phone'        => $user->phone,
            'image'        => $user->img,
            'unique_id'    => $user->unique_id,
            'department'   => $user->academics->department->name ?? null,
            'boarding_fee' => round(getStudentFee($user->academics, 'boarding'), 2),
            'academic_fee' => round(getStudentFee($user->academics, 'academic'), 2),
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
            $student = User::with(['academics', 'academics.class.feeTypes'])->where('unique_id', $request->student_id)->first();
            if (! $student) {
                return response()->json(['error' => 'Student not found'], 404);
            }

            // convert month to 2025-04

            if ($request->type == 'monthly_fee') {

                // if fee_type is not in fee_types table then create it
                DB::beginTransaction();
                MonthlyTransaction::run($request);

                if ($request->discount) {
                    MonthlyDiscount::run($student, $request);
                }
                $academic_fee_base = getStudentFee($student->academics, 'academic');
                $boarding_fee_base = getStudentFee($student->academics, 'boarding');

                $academic_divider = $academic_division = $boarding_divider = $boarding_division = 0;

                if ($academic_fee_base > 0) {
                    $academic_divider  = (int) ($request->academic_fee / $academic_fee_base);
                    $academic_division = $request->academic_fee % $academic_fee_base;
                }

                if ($boarding_fee_base > 0) {
                    $boarding_divider  = (int) ($request->boarding_fee / $boarding_fee_base);
                    $boarding_division = $request->boarding_fee % $boarding_fee_base;
                }

                $year = $request->year;

                AddMonthlyFee::run($request, $student, $academic_divider, $academic_division, $boarding_divider, $boarding_division, $year);

                DB::commit();
                return redirect()->back()->with('success', 'Monthly fee added successfully');

            }

        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->with('error', $th->getMessage());
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

    public function due_list()
    {
        $year       = request()->input('year') ?? date('Y');
        $gender     = request()->input('gender');
        $class      = request()->input('class');
        $department = request()->input('department');

        $date = date('Y-m');

        $data        = DueList::run($date, $gender, $class, $department);
        $filterGroup = DueFilterGroup::make()->handle();
        return Inertia::render('admin::finance/dueList', [
            'data'       => $data,
            'filterData' => $filterGroup,
        ]);
    }

}
