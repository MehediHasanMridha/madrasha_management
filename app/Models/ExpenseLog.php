<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpenseLog extends Model
{
    protected $table    = 'expense_logs';
    protected $fillable = [
        'user_id',
        'voucher_type_id',
        'amount',
        'date',
        'created_by',
        'details',
        'note',
        'holder_name',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function voucherType()
    {
        return $this->belongsTo(VoucherType::class);
    }
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('details', 'like', '%' . $search . '%')
                    ->orWhere('amount', 'like', '%' . $search . '%');
            });
        });
    }
    public function scopeDateFilter($query, array $filters)
    {
        $query->when($filters['start_date'] ?? false, function ($query, $start_date) {
            $query->where('date', '>=', $start_date);
        });
        $query->when($filters['end_date'] ?? false, function ($query, $end_date) {
            $query->where('date', '<=', $end_date);
        });
    }
    public function scopeDateRange($query, $start_date, $end_date)
    {
        return $query->whereBetween('date', [$start_date, $end_date]);
    }
}
