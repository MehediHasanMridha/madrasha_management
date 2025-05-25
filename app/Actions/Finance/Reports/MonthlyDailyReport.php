<?php
namespace App\Actions\Finance\Reports;

use App\Models\ExpenseLog;
use App\Models\IncomeLog;
use Lorisleiva\Actions\Concerns\AsAction;

class MonthlyDailyReport
{
    use AsAction;
    public function handle($day, $month, $year)
    {
        $day = str_pad($day, 2, '0', STR_PAD_LEFT);
        // how to convert day, month & year to Y-m-d format
        $period = date('Y-m-d', strtotime($year . '-' . $month . '-' . $day));
        // If no period is provided, use the current month
        $outgoing = ExpenseLog::query()
            ->whereHas('voucherType', function ($query) {
                $query->where('slug', '!=', 'salary');
            })
            ->where('date', [$period])
            ->get()
            ->map(function ($item) {
                return [
                    'type'   => $item->voucherType->name ?? 'Unknown',
                    'amount' => intval($item->amount),
                    'name'   => $item->holder_name,
                ];
            });

        $incoming = IncomeLog::with('feeType')
            ->where('status', 'paid')
            ->where('created_at', 'like', '%' . $period . '%')
            ->get()
            ->map(function ($item) {
                return [
                    'type'   => $item->feeType->name ?? 'Unknown',
                    'amount' => $item->amount,
                ];
            })->groupBy('type')->map(function ($group, $type) {
            return [
                'type'   => $type,
                'amount' => $group->sum('amount'),
            ];
        })->values();

        return [
            'outgoings' => $outgoing,
            'incomings' => $incoming,
        ];
    }
}
