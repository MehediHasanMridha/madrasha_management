<?php
namespace App\Actions\SMS;

use Lorisleiva\Actions\Concerns\AsAction;

class SpecificPhoneNumbers
{

    use AsAction;
    // This class is currently empty, but you can add methods and properties as needed.
    // For example, you might want to implement methods for sending SMS messages,
    // handling SMS responses, etc.

    public function handle($numbers)
    {
        $numbers      = explode(',', $numbers);
        $phoneNumbers = collect($numbers)->map(function ($number) {
            return validateAndFormatPhoneNumber($number);
        })->filter();

        return $phoneNumbers;
    }

}
