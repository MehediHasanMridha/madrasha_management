<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentDiscount extends Model
{

    // Define the table associated with the model
    protected $table = 'student_discounts';

    // Define the fillable attributes
    protected $fillable = [
        'user_id',
        'discount_amount',
        'description',
        'created_at',
        'updated_at',
    ];

    // Define the relationship with User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
