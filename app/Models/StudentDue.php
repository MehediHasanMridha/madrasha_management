<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentDue extends Model
{
    protected $table = 'student_dues';

    protected $fillable = [
        'user_id',
        'fee_type_id',
        'due_period',
        'expected_amount',
        'paid_amount',
        'due_amount',
    ];
}
