<?php
namespace App\Actions\Finance\Expense;

use App\Models\ExpenseLog;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class AddOthersVoucher
{
    use AsAction;
    public function handle($request)
    {
        Transaction::create([
            'transaction_id'   => 'TRN-' . str_pad(mt_rand(1, 999999999), 9, '0', STR_PAD_LEFT),
            'user_id'          => Auth::user()->id,
            'transaction_type' => 'expense',
            'amount'           => $request->items ? collect($request->items)->reduce(fn($carry, $item) => $carry + intval($item['amount'])) : 0,
            'note'             => $request->comments ?? null,
        ]);

        ExpenseLog::create([
            'voucher_type_id' => $request->voucherType, // get from fee_types table
            'date'            => date('Y-m-d', strtotime($request->date)),
            'amount'          => $request->items ? collect($request->items)->reduce(fn($carry, $item) => $carry + intval($item['amount'])) : 0,
            'created_by'      => Auth::user()->id,
            'note'            => $request->comments,
            'details'         => $request->items ? json_encode($request->items) : null,
            'holder_name'     => $request->voucherHolder,
        ]);

    }
}
