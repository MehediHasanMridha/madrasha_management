<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}
