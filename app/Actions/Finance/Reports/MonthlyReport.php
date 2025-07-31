<?php
namespace App\Actions\Finance\Reports;

use App\Models\ExpenseLog;
use App\Models\IncomeLog;
use App\Models\StudentDiscount;
use Lorisleiva\Actions\Concerns\AsAction;

class MonthlyReport
{
    use AsAction;
    public function handle($month)
    {
        $outgoing = ExpenseLog::query()
            ->where(function ($query) use ($month) {
                $query->whereHas('voucherType', function ($subQuery) {
                    $subQuery->where('slug', 'salary');
                })->whereMonth('created_at', date('m', strtotime($month)));
            })
            ->orWhere(function ($query) use ($month) {
                $query->whereHas('voucherType', function ($subQuery) {
                    $subQuery->where('slug', '!=', 'salary');
                })->whereMonth('date', date('m', strtotime($month)));
            })
            ->get()
            ->groupBy(function ($item) {
                // Use created_at for salary vouchers, date for others
                if ($item->voucherType && $item->voucherType->slug === 'salary') {
                    return date('d', strtotime($item->created_at));
                } else {
                    return date('d', strtotime($item->date));
                }
            })
            ->map(function ($dayGroup, $day) {
                return [
                    'day'          => $day,
                    'data'         => $dayGroup,
                    'total_amount' => $dayGroup->sum('amount'),
                ];
            });

        $incoming = IncomeLog::query()
            ->where('status', 'paid')
            ->whereMonth('created_at', date('m', strtotime($month)))
            ->get()
            ->groupBy(function ($item) {
                return date('d', strtotime($item->created_at));
            })
            ->map(function ($dayGroup, $day) {
                return [
                    'day'          => $day,
                    'total_amount' => $dayGroup->sum('amount') - StudentDiscount::whereDay('created_at', $day)->get()
                        ->map(fn($item) => ['amount' => $item->amount])
                        ->sum('amount'),
                ];
            });

        // Merge day wise income and outgoing
        $merged  = collect();
        $allDays = $outgoing->keys()->merge($incoming->keys())->unique()->sort();

        foreach ($allDays as $day) {
            $outgoingAmount = $outgoing->get($day)['total_amount'] ?? 0;
            $incomingAmount = $incoming->get($day)['total_amount'] ?? 0;

            $merged->put($day, [
                'day'        => $day,
                'outgoing'   => $outgoingAmount,
                'incoming'   => $incomingAmount,
                'net_amount' => $incomingAmount - $outgoingAmount,
            ]);
        }

        return $merged->values();
    }
}
