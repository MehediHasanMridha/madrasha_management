<?php
namespace App\Actions\SMS;

use App\Models\User;
use Lorisleiva\Actions\Concerns\AsAction;

class AllDueStudentNumbers
{

    use AsAction;
    // This class is currently empty, but you can add methods and properties as needed.
    // For example, you might want to implement methods for sending SMS messages,
    // handling SMS responses, etc.

    public function handle()
    {
        $currentDate = date('Y-m');
        $dueStudents = User::with(['academics.class', 'academics.department', 'incomeLogs.studentDue', 'guardians'])
            ->whereHas('roles', fn($q) => $q->where('name', 'student'))
            ->where(function ($query) use ($currentDate) {
                // Students who don't have income log for current month
                $query->whereDoesntHave('incomeLogs', function ($q) use ($currentDate) {
                    $q->where('payment_period', $currentDate)
                        ->whereHas('feeType', function ($feeTypeQuery) {
                            $feeTypeQuery->where('slug', 'like', '%academic-fee%')
                                ->orWhere('slug', 'like', '%boarding-fee%');
                        });
                })
                // Or students who have a due for current month
                    ->orWhereHas('incomeLogs', function ($q) use ($currentDate) {
                        $q->where('payment_period', $currentDate)
                            ->whereHas('studentDue', function ($dueQuery) {
                                $dueQuery->where('due_amount', '>', 0);
                            });
                    });
            })->get();

        $phoneNumbers = ExtractNumbers::run($dueStudents);
        $phoneNumbers = $phoneNumbers->map(function ($number) {
            return validateAndFormatPhoneNumber($number);
        })->filter();

        return $phoneNumbers;
    }

}
