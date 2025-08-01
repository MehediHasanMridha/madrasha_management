<?php
namespace App\Actions\SMS;

use Lorisleiva\Actions\Concerns\AsAction;

class ExtractNumbers
{

    use AsAction;
    // This class is currently empty, but you can add methods and properties as needed.
    // For example, you might want to implement methods for sending SMS messages,
    // handling SMS responses, etc.

    public function handle($users)
    {
        $phoneNumbers = collect();
        foreach ($users as $user) {
            // Get user's own phone number
            if ($user->phone) {
                $phoneNumbers->push($user->phone);
            }

            // Get guardian phone numbers
            if ($user->hasRole('student') && $user->guardians && $user->guardians->numbers) {
                $guardianNumbers = json_decode($user->guardians->numbers, true);
                if (is_array($guardianNumbers)) {
                    foreach ($guardianNumbers as $number) {
                        if ($number) {
                            $phoneNumbers->push($number);
                        }
                    }
                }
            }
        }

        return $phoneNumbers;

    }

}
