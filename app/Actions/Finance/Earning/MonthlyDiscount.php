<?php
namespace App\Actions\Finance\Earning;

use App\Models\StudentDiscount;
use Lorisleiva\Actions\Concerns\AsAction;

class MonthlyDiscount
{
    use AsAction;
    public function handle($student, $request)
    {
        // Validate the request
        $request->validate([
            'discount' => 'required|numeric|min:0',
        ]);

        // Create a new StudentDiscount record
        $discount          = new StudentDiscount();
        $discount->user_id = $student->id;
        $discount->amount  = $request->discount;
        $discount->save();

    }
}
