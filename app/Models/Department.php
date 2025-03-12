<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    //

    public function classes()
    {
        return $this->hasMany(Classes::class);
    }

    public function academics()
    {
        return $this->belongsTo(Academic::class);
    }

}
