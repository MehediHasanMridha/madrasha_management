<?php
namespace App\Actions\Finance\Expense;

use App\Actions\Transaction\VoucherTransaction;
use App\Models\ExpenseLog;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class AddOthersVoucher
{
    use AsAction;
    public function handle($request)
    {
        VoucherTransaction::run($request);
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
