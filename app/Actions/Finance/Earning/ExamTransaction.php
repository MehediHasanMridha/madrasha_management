<?php
namespace App\Actions\Finance\Earning;

use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class ExamTransaction
{
    use AsAction;
    public function handle(
        $request,
        $student,
    ) {
        $examInfo = collect($request->monthlyInfo)->map(function ($examData) use ($request) {
            return [
                'exam'     => $examData['exam'],
                'exam_fee' => $examData['fee'],
                'year'     => $request->year,
            ];
        });
        $amount = $examInfo->sum(function ($examData) {
            return $examData['exam_fee'];
        }) ?? 0;
        $examInfo = [
            'type' => 'exam',
            'data' => $examInfo,
        ];
        $transaction                 = new Transaction();
        $transaction->transaction_id = 'TRN-' . str_pad(mt_rand(1, 999999999), 9, '0', STR_PAD_LEFT);
        $transaction->user_id        = $student->id;
        $transaction->note           = $request->note ?? null;
        $transaction->details        = json_encode($examInfo);
        $transaction->amount         = $amount;
        $transaction->receiver_id    = Auth::user()->id; // Assuming the receiver is the authenticated user
        $transaction->save();

    }
}
