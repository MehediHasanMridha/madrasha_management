<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Classes extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'des',
        'img',
        'department_id',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * Get the fee types for the class.
     */
    public function feeTypes(): HasMany
    {
        return $this->hasMany(FeeType::class, 'class_id');
    }

    public function academics(): HasMany
    {
        return $this->hasMany(Academic::class, 'class_id');
    }

    public function classAssigns(): HasMany
    {
        return $this->hasMany(ClassAssign::class, 'class_id');
    }

    public function subjects(): HasMany
    {
        return $this->hasMany(Subject::class, 'class_id');
    }

    /**
     * Get the exams for the class.
     */
    public function exams(): BelongsToMany
    {
        return $this->belongsToMany(Exam::class, 'exam_classes', 'class_id', 'exam_id')
            ->withTimestamps();
    }

    /**
     * Get the exam subjects for the class.
     */
    public function examSubjects(): HasMany
    {
        return $this->hasMany(ExamSubject::class, 'class_id');
    }
}
