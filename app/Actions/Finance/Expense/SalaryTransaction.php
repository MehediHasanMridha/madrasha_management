<?php
namespace App\Actions\Finance\Expense;

use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class SalaryTransaction
{
    use AsAction;
    public function handle(
        $request,
        $year,
        $staff
    ) {
        $monthlyInfo = collect($request->monthlyInfo)->map(function ($monthData) use ($year) {
            $month_date = $year . '-' . $monthData['month'];
            $month_date = date('F', strtotime($month_date));
            return [
                'month'  => $month_date,
                'salary' => $monthData['salary'] ?? 0,
                'year'   => $year,
            ];
        });
        $amount = $monthlyInfo->sum(function ($month) {
            return $month['salary'];
        });
        $transaction                   = new Transaction();
        $transaction->transaction_id   = 'TRN-' . str_pad(mt_rand(1, 999999999), 9, '0', STR_PAD_LEFT);
        $transaction->user_id          = $staff->id;
        $transaction->transaction_type = 'expense';
        $transaction->note             = $request->note ?? null;
        $transaction->details          = json_encode($monthlyInfo);
        $transaction->amount           = $amount;
        $transaction->receiver_id      = Auth::user()->id; // Assuming the receiver is the authenticated user
        $transaction->save();

    }
}
