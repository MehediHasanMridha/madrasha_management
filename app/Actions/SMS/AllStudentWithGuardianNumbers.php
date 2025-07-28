<?php
namespace App\Actions\SMS;

use App\Models\User;
use Lorisleiva\Actions\Concerns\AsAction;

class AllStudentWithGuardianNumbers
{

    use AsAction;
    // This class is currently empty, but you can add methods and properties as needed.
    // For example, you might want to implement methods for sending SMS messages,
    // handling SMS responses, etc.

    public function handle()
    {
        $allStudents = User::whereHas('roles', function ($q) {
            $q->where('name', 'student');
        })->with('guardians')->get();

        $phoneNumbers = ExtractNumbers::run($allStudents);
        $phoneNumbers = $phoneNumbers->map(function ($number) {
            return validateAndFormatPhoneNumber($number);
        })->filter();

        return $phoneNumbers;
    }

}
