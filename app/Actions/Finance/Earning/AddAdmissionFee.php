<?php
namespace App\Actions\Finance\Earning;

use App\Models\IncomeLog;
use App\Models\PaymentMethod;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class AddAdmissionFee
{
    use AsAction;
    public function handle(
        $request,
        $student,
    ) {
        // update student academics department and class id
        $academics = $student->academics;
        if ($academics) {
            $academics->department_id = $request->department;
            $academics->class_id      = $request->class;
            $academics->save();
        } else {
            // Optionally, handle the case where academics is null
            throw new \Exception('Student academics record not found.');
        }

        $month = date('Y-m');
        IncomeLog::create([
            'user_id'           => $student->id,
            'amount'            => $request->admissionFee,
            'fee_type_id'       => $student->academics->class->feeTypes->where('name', 'Admission Fee')->first()->id,             // get from fee_types table
            'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
            'status'            => 'paid',
            'source_details'    => $request->note,
            'payment_period'    => $month,
            'receiver_id'       => Auth::user()->id,
        ]);

    }
}
