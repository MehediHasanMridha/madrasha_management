<?php
namespace App\Actions\Finance\Earning;

use App\Models\IncomeLog;
use App\Models\PaymentMethod;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class AddAdmissionFeeWithAddStudent
{

    use AsAction;
    // This class is currently empty, but you can add methods and properties as needed.
    // For example, you might want to implement methods for sending SMS messages,
    // handling SMS responses, etc.

    public function handle($request, $student)
    {
        $month = date('Y-m');
        IncomeLog::create([
            'user_id'           => $student->id,
            'amount'            => $request->admission_fee,
            'fee_type_id'       => $student->academics->class->feeTypes->where('name', 'Admission Fee')->first()->id,             // get from fee_types table
            'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
            'status'            => 'paid',
            'payment_period'    => $month,
            'receiver_id'       => Auth::user()->id,
        ]);
        if ($request->month) {
            $month = date('Y') . '-' . str_pad($request->month, 2, '0', STR_PAD_LEFT);
            IncomeLog::create([
                'user_id'           => $student->id,
                'amount'            => getStudentFee($student->academics, 'academic'),
                'fee_type_id'       => $student->academics->class->feeTypes->where('name', 'Academic Fee')->first()->id,              // get from fee_types table
                'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
                'status'            => 'paid',
                'payment_period'    => $month,
                'receiver_id'       => Auth::user()->id,
            ]);

            IncomeLog::create([
                'user_id'           => $student->id,
                'amount'            => getStudentFee($student->academics, 'boarding'),
                'fee_type_id'       => $student->academics->class->feeTypes->where('name', 'Boarding Fee')->first()->id,              // get from fee_types table
                'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
                'status'            => 'paid',
                'payment_period'    => $month,
                'receiver_id'       => Auth::user()->id,
            ]);
        }

    }

}
