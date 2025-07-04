<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Exam extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'description',
        'department_id',
        'type',
        'status',
        'start_date',
        'end_date',
        'registration_start',
        'registration_end',
        'fee_type_id',
        'is_fee_required',
        'instructions',
        'total_marks',
        'pass_marks',
        'duration_minutes',
        'meta_data',
        'published_at',
        'created_by',
    ];

    protected $casts = [
        'start_date'         => 'datetime',
        'end_date'           => 'datetime',
        'registration_start' => 'datetime',
        'registration_end'   => 'datetime',
        'published_at'       => 'datetime',
        'is_fee_required'    => 'boolean',
        'total_marks'        => 'integer',
        'pass_marks'         => 'integer',
        'duration_minutes'   => 'integer',
        'meta_data'          => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($exam) {
            if (empty($exam->slug)) {
                $exam->slug = Str::slug($exam->name);
            }
        });
    }

    /**
     * Get the department that owns the exam.
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * Get the user who created the exam.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the fee type associated with the exam.
     */
    public function feeType(): BelongsTo
    {
        return $this->belongsTo(FeeType::class);
    }

    /**
     * Get the classes associated with the exam.
     */
    public function classes(): BelongsToMany
    {
        return $this->belongsToMany(Classes::class, 'exam_classes', 'exam_id', 'class_id')
            ->withTimestamps();
    }

    /**
     * Get the exam subjects for the exam.
     */
    public function examSubjects(): HasMany
    {
        return $this->hasMany(ExamSubject::class);
    }

    /**
     * Get all subjects through exam subjects.
     */
    public function subjects(): BelongsToMany
    {
        return $this->belongsToMany(Subject::class, 'exam_subjects', 'exam_id', 'subject_id')
            ->withPivot(['class_id', 'exam_date', 'start_time', 'end_time', 'total_marks', 'pass_marks', 'instructions', 'status'])
            ->withTimestamps();
    }

    /**
     * Get the exam fee amount.
     */
    public function getExamFeeAmount(): ?float
    {
        return $this->feeType ? $this->feeType->amount : null;
    }

    /**
     * Scope for published exams.
     */
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }

    /**
     * Scope for active exams.
     */
    public function scopeActive($query)
    {
        return $query->whereIn('status', ['scheduled', 'ongoing']);
    }

    /**
     * Scope for exams by department.
     */
    public function scopeByDepartment($query, $departmentId)
    {
        return $query->where('department_id', $departmentId);
    }

    /**
     * Check if exam is currently ongoing.
     */
    public function isOngoing(): bool
    {
        return $this->status === 'ongoing' ||
            (now()->between($this->start_date, $this->end_date) && $this->status === 'scheduled');
    }

    /**
     * Check if exam registration is open.
     */
    public function isRegistrationOpen(): bool
    {
        if (! $this->registration_start || ! $this->registration_end) {
            return false;
        }

        return now()->between($this->registration_start, $this->registration_end);
    }

    /**
     * Get exam status with time information.
     */
    public function getStatusWithTime(): array
    {
        $now = now();

        if ($this->status === 'completed') {
            return [
                'status'   => 'finished',
                'timeLeft' => null,
            ];
        }

        if ($this->status === 'cancelled') {
            return [
                'status'   => 'cancelled',
                'timeLeft' => null,
            ];
        }

        if ($now->lt($this->start_date)) {
            $timeLeft = $now->diffForHumans($this->start_date, true);
            return [
                'status'   => 'pending',
                'timeLeft' => $timeLeft . ' left',
            ];
        }

        if ($now->between($this->start_date, $this->end_date)) {
            return [
                'status'   => 'ongoing',
                'timeLeft' => 'In progress',
            ];
        }

        if ($this->status === 'draft') {
            return [
                'status'   => 'not_scheduled',
                'timeLeft' => null,
            ];
        }

        return [
            'status'   => 'finished',
            'timeLeft' => null,
        ];
    }

    /**
     * Scope for upcoming exams.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('start_date', '>', now());
    }

    /**
     * Scope for past exams.
     */
    public function scopePast($query)
    {
        return $query->where('end_date', '<', now());
    }

    /**
     * Get exam count by status for department.
     */
    public static function getStatusCountByDepartment($departmentId)
    {
        return self::selectRaw('status, COUNT(*) as count')
            ->where('department_id', $departmentId)
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();
    }

    /**
     * Search exams by name or description.
     */
    public function scopeSearch($query, $term)
    {
        return $query->where(function ($q) use ($term) {
            $q->where('name', 'like', "%{$term}%")
                ->orWhere('description', 'like', "%{$term}%");
        });
    }
}
