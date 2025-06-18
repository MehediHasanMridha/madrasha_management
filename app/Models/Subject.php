<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'icon',
        'code',
        'class_id',
    ];

    public function class (): BelongsTo
    {
        return $this->belongsTo(Classes::class);
    }

    /**
     * Get the exam subjects for the subject.
     */
    public function examSubjects(): HasMany
    {
        return $this->hasMany(ExamSubject::class, 'subject_id');
    }

    /**
     * Get the exams for the subject.
     */
    public function exams(): BelongsToMany
    {
        return $this->belongsToMany(Exam::class, 'exam_subjects', 'subject_id', 'exam_id')
            ->withPivot(['class_id', 'exam_date', 'start_time', 'end_time', 'total_marks', 'pass_marks', 'instructions', 'status'])
            ->withTimestamps();
    }
}
