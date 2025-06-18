<?php
namespace App\Actions\Finance\Earning;

use App\Models\IncomeLog;
use App\Models\PaymentMethod;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class AddExamFee
{
    use AsAction;
    public function handle(
        $request,
        $student,
    ) {
        $examInfo = collect($request->monthlyInfo);
        $year     = $request->year;
        $examInfo->map(function ($item, $key) use ($student, $year) {
            IncomeLog::create([
                'user_id'           => $student->id,
                'amount'            => $item['fee'],
                'fee_type_id'       => $item['fee_type_id'],
                'payment_method_id' => PaymentMethod::where('slug', 'cash')->firstOrCreate(['name' => 'Cash', 'slug' => 'cash'])->id, // get from payment_methods table
                'status'            => 'paid',
                'payment_period'    => date('Y-m', strtotime($year)),
                'receiver_id'       => Auth::user()->id,
            ]);

        });
    }
}
