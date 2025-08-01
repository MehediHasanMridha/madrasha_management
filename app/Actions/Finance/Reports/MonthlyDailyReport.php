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
            ->where(function ($query) use ($period) {
                $query->whereHas('voucherType', function ($subQuery) use ($period) {
                    $subQuery->where('slug', 'salary');
                })->where('created_at', 'like', '%' . $period . '%')
                    ->orWhereHas('voucherType', function ($subQuery) use ($period) {
                        $subQuery->where('slug', '!=', 'salary');
                    })->where('date', [$period]);
            })
            ->get()
            ->map(function ($item) {
                return [
                    'type'   => $item->voucherType->name ?? 'Unknown',
                    'amount' => intval($item->amount),
                    'name'   => $item->holder_name,
                ];
            })->groupBy('type')->map(function ($group, $type) {
            return [
                'type'   => $type,
                'name'   => $group->first()['name'],
                'amount' => $group->sum('amount'),
            ];
        })->values();

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
