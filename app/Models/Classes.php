<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Classes extends Model
{
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

    public function academics(): HasMany
    {
        return $this->hasMany(Academic::class, 'class_id');
    }

    public function classAssigns(): HasMany
    {
        return $this->hasMany(ClassAssign::class, 'class_id');
    }
}
