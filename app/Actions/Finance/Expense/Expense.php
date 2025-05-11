<?php
namespace App\Actions\Finance\Expense;

use App\Models\ExpenseLog;
use Lorisleiva\Actions\Concerns\AsAction;

class Expense
{
    use AsAction;
    public function handle($month, $year)
    {
        // how to convert month & year to Y-m
        $period = date('Y-m', strtotime($month . ' ' . $year));
        // If no period is provided, use the current month
        if (! $period) {
            $period = date('Y-m');
        }

        $outgoings = ExpenseLog::with('voucherType')
            ->where('date', 'like', $period . '%') // get all vouchers for the month but date is "2025-04-22" format
            ->groupBy('voucher_type_id')
            ->selectRaw('voucher_type_id, sum(amount) as amount')
            ->get()
            ->map(function ($item) {
                return [
                    'type'   => $item->voucherType->name ?? 'Unknown',
                    'amount' => $item->amount,
                ];
            });

        return $outgoings;
    }
}
