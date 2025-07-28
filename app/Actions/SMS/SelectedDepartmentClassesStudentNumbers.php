<?php
namespace App\Actions\SMS;

use App\Models\User;
use Lorisleiva\Actions\Concerns\AsAction;

class SelectedDepartmentClassesStudentNumbers
{

    use AsAction;
    // This class is currently empty, but you can add methods and properties as needed.
    // For example, you might want to implement methods for sending SMS messages,
    // handling SMS responses, etc.

    public function handle($departmentId, $selectedClass)
    {
        $query = User::whereHas('roles', function ($q) {
            $q->where('name', 'student');
        })->whereHas('academics', function ($q) use ($departmentId) {
            $q->where('department_id', $departmentId);
        })->with('guardians');

        // Filter by class if specific class is selected
        if ($selectedClass !== 'all') {
            $query->whereHas('academics', function ($q) use ($selectedClass) {
                $q->where('class_id', $selectedClass);
            });
        }

        $students = $query->get();

        $phoneNumbers = ExtractNumbers::run($students);
        $phoneNumbers = $phoneNumbers->map(function ($number) {
            return validateAndFormatPhoneNumber($number);
        })->filter();

        return $phoneNumbers;
    }

}
