<?php
namespace App\Actions\Finance\Reports;

use App\Models\ExpenseLog;
use App\Models\IncomeLog;
use App\Models\StudentDiscount;
use Lorisleiva\Actions\Concerns\AsAction;

class MonthlyDailyReport
{
    use AsAction;
    public function handle($period)
    {
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

        $discounts = StudentDiscount::where('created_at', 'like', "%{$period}%")->get()
            ->map(fn($item) => ['amount' => $item->amount])
            ->sum('amount');

        return [
            'outgoings' => $outgoing,
            'incomings' => $incoming,
            'discounts' => $discounts,
        ];
    }
}
