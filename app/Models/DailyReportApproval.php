<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyReportApproval extends Model
{
    protected $table = 'daily_report_approvals';

    protected $fillable = [
        'day_number',
        'month_year',
        'is_approved',
        'user_id',
    ];

    protected $casts = [
        'is_approved' => 'boolean',
    ];

    /**
     * Get the user who approved the daily report.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope to filter by month and year.
     */
    public function scopeByMonthYear($query, $monthYear)
    {
        return $query->where('month_year', $monthYear);
    }

    /**
     * Scope to filter by approval status.
     */
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    /**
     * Scope to filter by pending approval.
     */
    public function scopePending($query)
    {
        return $query->where('is_approved', false);
    }

    /**
     * Scope to filter by specific day.
     */
    public function scopeByDay($query, $dayNumber)
    {
        return $query->where('day_number', $dayNumber);
    }

    /**
     * Scope to filter by date range.
     */
    public function scopeDateRange($query, $startMonthYear, $endMonthYear)
    {
        return $query->whereBetween('month_year', [$startMonthYear, $endMonthYear]);
    }

    /**
     * Get approval status as text.
     */
    public function getStatusAttribute()
    {
        return $this->is_approved ? 'Approved' : 'Pending';
    }

    /**
     * Check if the report is approved for a specific day and month-year.
     */
    public static function isApproved($dayNumber, $monthYear)
    {
        return self::where('day_number', $dayNumber)
            ->where('month_year', $monthYear)
            ->where('is_approved', true)
            ->exists();
    }

    /**
     * Create or update approval status.
     */
    public static function setApproval($dayNumber, $monthYear, $isApproved, $userId = null)
    {
        return self::updateOrCreate(
            [
                'day_number' => $dayNumber,
                'month_year' => $monthYear,
            ],
            [
                'is_approved' => $isApproved,
                'user_id'     => $userId,
            ]
        );
    }
}
