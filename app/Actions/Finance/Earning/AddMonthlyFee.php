<?php
namespace App\Actions\Finance\Earning;

use App\Models\IncomeLog;
use App\Models\PaymentMethod;
use App\Models\StudentDue;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class AddMonthlyFee
{
    use AsAction;
    public function handle(
        $request,
        $student,
        $academic_divider,
        $academic_division,
        $boarding_divider,
        $boarding_division,
        $year
    ) {
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
                    'fee_type_id'       => $student->academics->class->feeTypes->where('name', 'Academic Fee')->first()->id,              // get from fee_types table
                    'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
                    'status'            => 'paid',
                    'payment_period'    => $month,
                    'receiver_id'       => Auth::user()->id,
                ]);
            } else {
                $incomeLog = IncomeLog::create([
                    'user_id'           => $student->id,
                    'amount'            => $academic_fee,
                    'fee_type_id'       => $student->academics->class->feeTypes->where('name', 'Academic Fee')->first()->id,              // get from fee_types table
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
                    'fee_type_id'       => $student->academics->class->feeTypes->where('name', 'Boarding Fee')->first()->id,              // get from fee_types table
                    'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
                    'status'            => 'paid',
                    'payment_period'    => $month,
                    'receiver_id'       => Auth::user()->id,
                ]);
            } else {
                $incomeLog = IncomeLog::create([
                    'user_id'           => $student->id,
                    'amount'            => $boarding_fee,
                    'fee_type_id'       => $student->academics->class->feeTypes->where('name', 'Boarding Fee')->first()->id,              // get from fee_types table
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

    }
}
