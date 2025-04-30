<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentDue extends Model
{
    protected $table = 'student_dues';

    protected $fillable = [
        'income_log_id',
        'due_amount',
    ];

    public function incomeLog()
    {
        return $this->belongsTo(IncomeLog::class);
    }
}
