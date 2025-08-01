<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoucherType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    protected $casts = [
        'slug' => 'string',
    ];

    public function expenseLogs()
    {
        return $this->hasMany(ExpenseLog::class);
    }
}
