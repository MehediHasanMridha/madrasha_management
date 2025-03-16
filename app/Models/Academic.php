<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Academic extends Model
{
    //
    public function student()
    {
        return $this->belongsTo(User::class, 'user_id')->whereHas('roles', function ($q) {
            $q->where('name', 'student');
        });
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function class ()
    {
        return $this->belongsTo(Classes::class);
    }

}
