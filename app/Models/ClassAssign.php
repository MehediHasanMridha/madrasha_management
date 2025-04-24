<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassAssign extends Model
{
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
