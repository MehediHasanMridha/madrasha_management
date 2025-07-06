<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassAssign extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'class_id',
        'dept_id',
    ];
    protected $table = 'class_assigns';
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function class ()
    {
        return $this->hasOne(Classes::class);
    }

    public function department()
    {
        return $this->hasOne(Department::class);
    }
}
