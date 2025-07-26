<?php
namespace App\Actions\Finance\Expense;

use App\Models\ExpenseLog;
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
        SalaryTransaction::run($request, $request->year, $staff);
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
