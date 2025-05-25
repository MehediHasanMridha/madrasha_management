<?php
namespace App\Actions\Finance\Earning;

use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class MonthlyTransaction
{
    use AsAction;
    public function handle($request)
    {
        $total_fee                   = $request->academic_fee + $request->boarding_fee;
        $transaction                 = new Transaction();
        $transaction->transaction_id = 'TRN-' . str_pad(mt_rand(1, 999999999), 9, '0', STR_PAD_LEFT);
        $transaction->user_id        = Auth::user()->id;
        $transaction->amount         = $total_fee;
        $transaction->note           = $request->details ?? null;
        $transaction->save();

    }
}
