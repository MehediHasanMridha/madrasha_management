<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WelcomePageContent extends Model
{
    protected $fillable = [
        'section_key',
        'title',
        'content',
        'data',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'data'      => 'array',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
