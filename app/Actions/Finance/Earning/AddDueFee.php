<?php
namespace App\Actions\Finance\Earning;

use App\Models\IncomeLog;
use Lorisleiva\Actions\Concerns\AsAction;

class AddDueFee
{
    use AsAction;
    public function handle(
        $request,
    ) {
        $academicIncome = IncomeLog::find($request->academic_income_id);
        $boardingIncome = IncomeLog::find($request->boarding_income_id);
        $academicIncome->amount += $request->academic_due;
        $boardingIncome->amount += $request->boarding_due;
        $academicIncome->save();
        $boardingIncome->save();

        // delete Student due
        if ($academicIncome->studentDue) {
            $academicIncome->studentDue->delete();
        }
        if ($boardingIncome->studentDue) {
            $boardingIncome->studentDue->delete();
        }
    }
}
