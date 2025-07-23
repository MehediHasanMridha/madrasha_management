<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table    = 'transactions';
    protected $fillable = [
        'transaction_id',
        'user_id',
        'transaction_type',
        'note',
        'amount',
        'receiver_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function receiver()
    {
        return $this->hasOne(User::class, 'id', 'receiver_id');
    }

}
