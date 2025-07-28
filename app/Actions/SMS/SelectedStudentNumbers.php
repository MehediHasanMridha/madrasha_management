<?php
namespace App\Actions\SMS;

use App\Models\User;
use Lorisleiva\Actions\Concerns\AsAction;

class SelectedStudentNumbers
{

    use AsAction;
    // This class is currently empty, but you can add methods and properties as needed.
    // For example, you might want to implement methods for sending SMS messages,
    // handling SMS responses, etc.

    public function handle($selectedStudentIds)
    {
        $students = User::whereIn('unique_id', $selectedStudentIds)
            ->with('guardians')->get();

        $phoneNumbers = ExtractNumbers::run($students);
        $phoneNumbers = $phoneNumbers->map(function ($number) {
            return validateAndFormatPhoneNumber($number);
        })->filter();

        return $phoneNumbers;
    }

}
