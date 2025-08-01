<?php
namespace App\Actions\Transaction;

use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class AdmissionTransaction
{
    use AsAction;
    public function handle(
        $request,
        $student,
    ) {
        $admissionInfo = [];
        if ($request->month) {
            $month         = date('F', mktime(0, 0, 0, $request->month, 1));
            $admissionInfo = [
                'type' => 'admission_fee',
                'data' => [
                    'admissionFee' => $request->admission_fee,
                    'class'        => $student->academics->class->name,
                    'department'   => $student->academics->department->name,
                    'month'        => $month,
                    'monthly_fee'  => getStudentFee($student->academics, 'academic') +
                    getStudentFee($student->academics, 'boarding'),
                ],
            ];
        } else {
            $admissionInfo = [
                'type' => 'admission_fee',
                'data' => [
                    'admissionFee' => $request->admissionFee,
                    'class'        => $student->class_name,
                    'department'   => $student->department_name,
                ],
            ];
        }
        $transaction                 = new Transaction();
        $transaction->transaction_id = 'TRN-' . str_pad(mt_rand(1, 999999999), 9, '0', STR_PAD_LEFT);
        $transaction->user_id        = $student->id;
        $transaction->note           = $request->note ?? null;
        $transaction->details        = json_encode($admissionInfo);
        if ($request->month) {
            $transaction->amount = $admissionInfo['data']['monthly_fee'] + $admissionInfo['data']['admissionFee'] ?? 0; // Use monthly fee if month is provided
        } else {
            $transaction->amount = $admissionInfo['data']['admissionFee'] ?? 0; // Assuming admission fee is passed in the request
        }
        $transaction->receiver_id = Auth::user()->id; // Assuming the receiver is the authenticated user
        $transaction->save();

    }
}
