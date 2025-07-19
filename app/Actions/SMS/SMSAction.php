<?php
namespace App\Actions\SMS;

use App\Models\SMSBalance;
use Lorisleiva\Actions\Concerns\AsAction;

class SMSAction
{

    use AsAction;
    // This class is currently empty, but you can add methods and properties as needed.
    // For example, you might want to implement methods for sending SMS messages,
    // handling SMS responses, etc.

    public function handle($phoneNumber, $message)
    {
        $sms = SMSBalance::first();
        if ($sms->balance > 0) {
            $validPhoneNumbers = validateAndFormatPhoneNumber($phoneNumber);
            if (! empty($validPhoneNumbers)) {
                $response = $this->sms_send($validPhoneNumbers, $message);
                $response = json_decode($response, true);
                if ($response['success_message']) {
                    // Decrease the balance after sending SMS
                    $sms->decrement('balance');
                    return true;
                } else {
                    return false; // Handle failure to send SMS
                }
            } else {
                return false; // Handle invalid phone numbers
            }
        } else {
            return false; // Handle insufficient balance
        }
    }

    public function sms_send($validPhoneNumbers, $message)
    {
        $url      = "http://bulksmsbd.net/api/smsapi";
        $api_key  = "WqEMXtKIyUzdOiLrQyGm";
        $senderid = "8809617622335";
        $number   = $validPhoneNumbers;

        $data = [
            "api_key"  => $api_key,
            "senderid" => $senderid,
            "number"   => $number,
            "message"  => $message,
        ];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;

    }

}
