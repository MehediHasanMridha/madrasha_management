<?php
namespace App\Actions\Finance;

use App\Models\ExpenseLog;
use App\Models\IncomeLog;
use Lorisleiva\Actions\Concerns\AsAction;

class Summary
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

        $earnings = IncomeLog::with('feeType')
            ->where('status', 'paid')
            ->where('payment_period', $period)
            ->groupBy('fee_type_id')
            ->selectRaw('fee_type_id, sum(amount) as amount')
            ->get()
            ->map(function ($item) {
                return [
                    'type'   => $item->feeType->name ?? 'Unknown',
                    'amount' => $item->amount,
                ];
            });

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

        // return $outgoings;
        return [
            'earnings' => $earnings,
            'expenses' => $outgoings,
        ];

    }
}
