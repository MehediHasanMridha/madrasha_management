<?php
namespace App\Http\Controllers;

use App\Models\FeeType;
use App\Models\IncomeLog;
use App\Models\PaymentMethod;
use App\Models\StudentDue;
use App\Models\User;
use Illuminate\Http\Request;
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
        $month = request()->input('month');
        $year  = request()->input('year');

        // how to convert month & year to Y-m
        $period = date('Y-m', strtotime($month . ' ' . $year));
        // If no period is provided, use the current month
        if (! $period) {
            $period = date('Y-m');
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

        // return $earnings;
        $data = [
            'remaining_amount' => 234567,
            'earnings'         => $earnings,
            'expenses'         => [
                'boarding'              => 3456789,
                'staff_salary'          => 3456789,
                'institute_development' => 3456789,
                'others'                => 3456789,
                'total'                 => 13827156,
                'month'                 => 'January',
                'year'                  => '2024',
            ],
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

    public function get_student_data($student_id)
    {

        // find student by id
        $student = User::whereHas('roles', fn($q) => $q->where('name', 'student'))->where('unique_id', $student_id)->firstOrFail();

        return response()->json([
            'id'           => $student->id,
            'name'         => $student->name,
            'email'        => $student->email,
            'phone'        => $student->phone,
            'image'        => $student->img,
            'boarding_fee' => getStudentFee($student->id, 'boarding'),
            'academic_fee' => getStudentFee($student->id, 'academic'),
        ]);
    }

    public function add_money(Request $request)
    {
        // dd($request->all());
        // Validate the request data
        $request->validate([
            'student_id' => 'required|exists:users,unique_id',
            'month'      => 'required|in:January,February,March,April,May,June,July,August,September,October,November,December', // 'January',
            'type'       => 'required|in:monthly_fee,exam_fee,others_fee',
            'note'       => 'nullable|string|max:255',
        ]);

        // Find the student by unique_id
        $student = User::where('unique_id', $request->student_id)->first();

        if (! $student) {
            return response()->json(['error' => 'Student not found'], 404);
        }

        // convert month to 2025-04
        $month = date('Y-m', strtotime($request->month));

        if ($request->type == 'monthly_fee') {
            $total_fee = $request->boarding_fee + $request->academic_fee;

            if ($request->boarding_fee > 0) {
                IncomeLog::create([
                    'user_id'           => $student->id,
                    'month'             => $month,
                    'amount'            => $request->boarding_fee,
                    'fee_type_id'       => FeeType::where('name', 'like', '%boarding%')->first()->id, // get from fee_types table
                    'payment_method_id' => PaymentMethod::where('slug', 'cash')->first()->id,         // get from payment_methods table
                    'status'            => 'paid',
                    'payment_period'    => $month,
                ]);
            }

            if ($request->academic_fee > 0) {
                IncomeLog::create([
                    'user_id'           => $student->id,
                    'month'             => $month,
                    'amount'            => $request->academic_fee,
                    'fee_type_id'       => FeeType::where('name', 'like', '%academic%')->first()->id, // get from fee_types table
                    'payment_method_id' => PaymentMethod::where('slug', 'cash')->first()->id,         // get from payment_methods table
                    'status'            => 'paid',
                    'payment_period'    => $month,
                ]);
            }

            if ($request->academic_due > 0) {
                StudentDue::create([
                    'user_id'         => $student->id,
                    'fee_type_id'     => FeeType::where('name', 'like', '%academic%')->first()->id, // get from fee_types table
                    'paid_amount'     => $request->academic_fee,
                    'due_period'      => $month,
                    'expected_amount' => $request->academic_fee + $request->academic_due,
                ]);
            }

            if ($request->boarding_due > 0) {
                StudentDue::create([
                    'user_id'         => $student->id,
                    'fee_type_id'     => FeeType::where('name', 'like', '%boarding%')->first()->id, // get from fee_types table
                    'paid_amount'     => $request->boarding_fee,
                    'due_period'      => $month,
                    'expected_amount' => $request->boarding_fee + $request->boarding_due,
                ]);
            }

            // return response
            return to_route('finance.earnings')->with('success', 'Money added successfully');

        }

    }

}
