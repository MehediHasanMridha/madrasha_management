<?php
namespace App\Actions\Transaction;

use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class MonthlyTransaction
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
        $monthlyInfo = collect($request->monthlyInfo)->map(function ($monthData, $key) use ($request, $academic_divider, $academic_division, $boarding_divider, $boarding_division, $year) {
            $month_date   = $year . '-' . $monthData['month'];
            $month_date   = date('F', strtotime($month_date));
            $academic_fee = $key < $academic_divider ? $monthData['academic_fee'] : ($key === $academic_divider ? $academic_division : 0);
            $boarding_fee = $key < $boarding_divider ? $monthData['boarding_fee'] : ($key === $boarding_divider ? $boarding_division : 0);

            return [
                'month'            => $month_date,
                'academic_fee'     => $academic_fee,
                'boarding_fee'     => $boarding_fee,
                'due_academic_fee' => $monthData['academic_fee'] - $academic_fee,
                'due_boarding_fee' => $monthData['boarding_fee'] - $boarding_fee,
                'discount'         => $request->discount ?? 0,
                'year'             => $year,
            ];
        });
        $amount = $monthlyInfo->sum(function ($month) {
            return $month['academic_fee'] + $month['boarding_fee'];
        }) - $monthlyInfo[0]['discount'] ?? 0;
        $transaction                 = new Transaction();
        $transaction->transaction_id = 'TRN-' . str_pad(mt_rand(1, 999999999), 9, '0', STR_PAD_LEFT);
        $transaction->user_id        = $student->id;
        $transaction->note           = $request->details ?? null;
        $transaction->details        = json_encode($monthlyInfo);
        $transaction->amount         = $amount;
        $transaction->receiver_id    = Auth::user()->id; // Assuming the receiver is the authenticated user
        $transaction->save();

    }
}
