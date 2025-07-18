<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SMSBalance extends Model
{
    protected $table = 'sms_balances'; // Specify the table name if different

    public function balanceDecrement(float $amount): void
    {
        $this->balance -= $amount;
        $this->save();
    }

    // Additional methods or properties can be added here as needed

}
