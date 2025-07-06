<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamSubject extends Model
{
    protected $fillable = [
        'exam_id',
        'subject_id',
        'class_id',
        'exam_date',
        'start_time',
        'end_time',
        'total_marks',
        'pass_marks',
        'instructions',
        'status',
    ];

    protected $casts = [
        'exam_date'   => 'datetime',
        'total_marks' => 'integer',
        'pass_marks'  => 'integer',
    ];

    /**
     * Get the exam that owns the exam subject.
     */
    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    /**
     * Get the subject that owns the exam subject.
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Get the class that owns the exam subject.
     */
    public function class (): BelongsTo
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    /**
     * Scope for scheduled exam subjects.
     */
    public function scopeScheduled($query)
    {
        return $query->where('status', 'scheduled');
    }

    /**
     * Scope for completed exam subjects.
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Check if exam subject is currently ongoing.
     */
    // public function isOngoing(): bool
    // {
    //     $now = now();
    //     // $examStart = $this->exam_date->setTimeFromTimeString($this->start_time);
    //     // $examEnd   = $this->exam_date->setTimeFromTimeString($this->end_time);

    //     return $now->between($examStart, $examEnd) && $this->status === 'scheduled';
    // }

    /**
     * Get the start time formatted as HH:MM
     */
    public function getFormattedStartTimeAttribute(): string
    {
        return $this->start_time ? substr($this->start_time, 0, 5) : '';
    }

    /**
     * Get the end time formatted as HH:MM
     */
    public function getFormattedEndTimeAttribute(): string
    {
        return $this->end_time ? substr($this->end_time, 0, 5) : '';
    }
}
