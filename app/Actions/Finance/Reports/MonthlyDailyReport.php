<?php
namespace App\Actions\Finance\Reports;

use App\Models\ExpenseLog;
use Lorisleiva\Actions\Concerns\AsAction;

class MonthlyDailyReport
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
        $outgoing = ExpenseLog::query()
            ->whereRaw('DATE_FORMAT(date, "%Y-%m") = ?', [$period])
            ->selectRaw('DATE(date) as date')
            ->groupBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => date('d', strtotime($item->date)),
                ];
            });
        // how to get all the days of the month if the month is current month then show the current days else show the days of the month & also show the days of the month in the current year but not show the future days of the month in the next year
        $daysInMonth = cal_days_in_month(CAL_GREGORIAN, date('m', strtotime($period)), date('Y', strtotime($period)));
        $days        = [];
        for ($i = 1; $i <= $daysInMonth; $i++) {
            $days[] = [
                'date' => $i,
            ];
        }
        // check if the month is current month then show the current days else show the days of the month & also show the days of the month in the current year but not show the future days of the month in the next year
        if (date('Y-m') == $period) {
            $days = array_filter($days, function ($item) {
                return $item['date'] <= date('d');
            });
        } else {
            $days = array_filter($days, function ($item) use ($period) {
                return $item['date'] <= cal_days_in_month(CAL_GREGORIAN, date('m', strtotime($period)), date('Y', strtotime($period)));
            });
        }
        // check if the month is current month then show the current days else show the days of the month & also show the days of the month in the current year but not show the future days of the month in the next year
        $outgoing = array_map(function ($item) use ($outgoing) {
            $item['outgoing'] = 0;
            foreach ($outgoing as $out) {
                if ($item['date'] == $out['date']) {
                    $item['outgoing'] = 1;
                }
            }
            return $item;
        }, $days);
        return [
            'outgoings' => $outgoing,
            'incomings' => null,
        ];
    }
}
