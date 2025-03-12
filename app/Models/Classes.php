<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    //

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

}
