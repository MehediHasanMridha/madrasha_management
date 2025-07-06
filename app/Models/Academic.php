<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Academic extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'department_id',
        'class_id',
        'academic_fee',
        'boarding_fee',
        'academic_year',
        'session',
        'status',
    ];
    public function student()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function class ()
    {
        return $this->belongsTo(Classes::class);
    }

}
