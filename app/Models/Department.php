<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    public function classes()
    {
        return $this->hasMany(Classes::class);
    }

    public function academics()
    {
        return $this->hasMany(Academic::class);
    }

    public function classAssign()
    {
        return $this->hasMany(ClassAssign::class, 'dept_id');
    }

    /**
     * Get the fee types for the department.
     */
    public function feeTypes()
    {
        return $this->hasMany(FeeType::class, 'department_id');
    }

    /**
     * Get the exams for the department.
     */
    public function exams()
    {
        return $this->hasMany(Exam::class, 'department_id');
    }
}
