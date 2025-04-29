<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncomeLog extends Model
{
    protected $fillable = [
        'user_id',
        'source_type',
        'source_details',
        'amount',
        'fee_type_id',
        'payment_method_id',
        'payment_period',
        'status',
        'receiver_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function feeType()
    {
        return $this->belongsTo(FeeType::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('source_details', 'like', '%' . $search . '%')
                    ->orWhere('amount', 'like', '%' . $search . '%');
            });
        });
    }
}
