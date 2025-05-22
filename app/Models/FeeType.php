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
        'amount',
        'fee_category_id',
        'class_id',
        'department_id',
        'status',
    ];

    protected $casts = [
        'default_amount' => 'decimal:2',
        'status'         => 'boolean',
    ];

    public function studentDues()
    {
        return $this->hasMany(StudentDue::class);
    }

    public function incomeLogs()
    {
        return $this->hasMany(IncomeLog::class);
    }

    /**
     * Get the fee category associated with the fee type.
     */
    public function feeCategory()
    {
        return $this->belongsTo(FeeCategory::class);
    }

    /**
     * Get the class associated with the fee type.
     */
    public function class ()
    {
        return $this->belongsTo(Classes::class);
    }

    /**
     * Get the department associated with the fee type.
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
