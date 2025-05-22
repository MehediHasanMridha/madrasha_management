<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeeCategory extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['name', 'slug'];

    /**
     * Get the fee types for the fee category.
     */
    public function feeTypes()
    {
        return $this->hasMany(FeeType::class);
    }
}
