<?php
namespace App\Actions\Finance\Reports;

use App\Models\ExpenseLog;
use App\Models\IncomeLog;
use Lorisleiva\Actions\Concerns\AsAction;

class MonthlyGroupReport
{

    use AsAction;

    public function handle(): array
    {
        $expenseMonths = ExpenseLog::query()
            ->selectRaw('DATE_FORMAT(date, "%Y-%m") as month')
            ->groupBy('month')
            ->pluck('month')
            ->toArray();

        $incomeMonths = IncomeLog::query()
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month')
            ->groupBy('month')
            ->pluck('month')
            ->toArray();

        $availableMonths = array_unique(array_merge($expenseMonths, $incomeMonths));
        sort($availableMonths);

        $monthData = array_map(function ($month) {
            return date('F', strtotime($month));
        }, $availableMonths);

        return $monthData;
    }
}
