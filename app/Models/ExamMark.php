<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamMark extends Model
{
    protected $fillable = [
        'exam_id',
        'student_id',
        'subject_id',
        'class_id',
        'marks_obtained',
        'total_marks',
        'pass_marks',
        'grade',
        'status',
        'remarks',
    ];

    protected $casts = [
        'marks_obtained' => 'decimal:2',
        'total_marks'    => 'decimal:2',
        'pass_marks'     => 'decimal:2',
    ];

    /**
     * Get the exam that owns the mark.
     */
    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    /**
     * Get the student that owns the mark.
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get the subject that owns the mark.
     */
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Get the class that owns the mark.
     */
    public function class ()
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    /**
     * Calculate grade based on marks
     */
    public function calculateGrade(): string
    {
        if (! $this->marks_obtained || ! $this->total_marks) {
            return 'F';
        }

        $percentage = ($this->marks_obtained / $this->total_marks) * 100;

        return match (true) {
            $percentage >= 95 => 'A+',
            $percentage >= 90 => 'A',
            $percentage >= 85 => 'A-',
            $percentage >= 80 => 'B+',
            $percentage >= 75 => 'B',
            $percentage >= 70 => 'B-',
            $percentage >= 65 => 'C+',
            $percentage >= 60 => 'C',
            $percentage >= 55 => 'C-',
            $percentage >= 50 => 'D+',
            $percentage >= 40 => 'D',
            default => 'F'
        };
    }

    /**
     * Check if student passed
     */
    public function isPassed(): bool
    {
        return $this->marks_obtained >= $this->pass_marks;
    }
}
