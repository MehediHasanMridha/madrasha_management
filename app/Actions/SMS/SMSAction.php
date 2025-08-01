<?php
namespace App\Actions\SMS;

use Lorisleiva\Actions\Concerns\AsAction;

class SMSAction
{

    use AsAction;
    // This class is currently empty, but you can add methods and properties as needed.
    // For example, you might want to implement methods for sending SMS messages,
    // handling SMS responses, etc.

    public function handle($validPhoneNumbers, $message)
    {
        $validPhoneNumbers = $validPhoneNumbers->implode(',');
        $url               = "http://bulksmsbd.net/api/smsapi";
        $api_key           = "WqEMXtKIyUzdOiLrQyGm";
        $senderid          = "8809617622335";
        $number            = $validPhoneNumbers;

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
