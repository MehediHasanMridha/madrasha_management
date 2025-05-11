<?php
namespace App\Actions\Finance\Expense;

use App\Models\ExpenseLog;
use Lorisleiva\Actions\Concerns\AsAction;

class VoucherList
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

        $voucherList = ExpenseLog::with('voucherType')->whereHas('voucherType', function ($query) {
            $query->where('slug', '!=', 'salary');
        }
        )->where('date', 'like', $period . '%')
            ->get();

        return $voucherList;
    }
}
