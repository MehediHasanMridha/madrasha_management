<?php
namespace App\Actions\Finance\Expense;

use App\Models\ExpenseLog;
use App\Models\Transaction;
use App\Models\User;
use App\Models\VoucherType;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class AddSalaryVoucher
{
    use AsAction;

    public function handle($request)
    {
        $staff = User::where('unique_id', $request->staff_id)->first();
        // check voucher type
        $voucherType = VoucherType::where('slug', 'like', '%salary%')->first();
        if (! $voucherType) {
            // create a new voucher type
            $voucherType = VoucherType::create([
                'name' => 'Salary',
                'slug' => 'salary',
            ]);
        }
        // add new Transaction
        Transaction::create([
            'transaction_id'   => 'TRN-' . str_pad(mt_rand(1, 999999999), 9, '0', STR_PAD_LEFT),
            'user_id'          => Auth::user()->id,
            'transaction_type' => 'expense',
            'amount'           => $request->expense['amount'],
            'note'             => $request->expense['note'] ?? null,
        ]);
        $year        = $request->year;
        $monthlyInfo = collect($request->monthlyInfo);
        $monthlyInfo->map(function ($item, $key) use ($staff, $year, $voucherType) {
            $month = $year . '-' . $item['month'];
            $date  = date('Y-m-d', strtotime($month));
            if ($item['salary'] > 0) {
                // create a new voucher
                ExpenseLog::create([
                    'user_id'         => $staff->id,
                    'voucher_type_id' => $voucherType->id, // get from fee_types table
                    'date'            => $date,
                    'amount'          => $item['salary'],
                    'created_by'      => Auth::user()->id,
                ]);
            }
        });

    }
}
