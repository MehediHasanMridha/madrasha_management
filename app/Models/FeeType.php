<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeeType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'default_amount',
        'is_variable',
    ];

    protected $casts = [
        'is_variable'    => 'boolean',
        'default_amount' => 'decimal:2',
    ];

    public function studentDues()
    {
        return $this->hasMany(StudentDue::class);
    }

    public function incomeLogs()
    {
        return $this->hasMany(IncomeLog::class);
    }
}
