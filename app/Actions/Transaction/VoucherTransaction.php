<?php
namespace App\Actions\Transaction;

use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class VoucherTransaction
{
    use AsAction;

    public function handle($request)
    {
        $info = [
            'type' => 'voucher',
            'data' => $request->all(),
        ];
        $amount                        = $request->items ? collect($request->items)->reduce(fn($carry, $item) => $carry + intval($item['amount'])) : 0;
        $transaction                   = new Transaction();
        $transaction->transaction_id   = 'TRN-' . str_pad(mt_rand(1, 999999999), 9, '0', STR_PAD_LEFT);
        $transaction->transaction_type = 'expense';
        $transaction->note             = $request->comments ?? null;
        $transaction->details          = json_encode($info);
        $transaction->amount           = $amount;
        $transaction->receiver_id      = Auth::user()->id; // Assuming the receiver is the authenticated user
        $transaction->save();

    }
}
