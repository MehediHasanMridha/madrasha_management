<?php
namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Observers\UserObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Scout\Searchable;
use Spatie\Permission\Traits\HasRoles;

#[ObservedBy([UserObserver::class])]
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'unique_id',
        'phone',
        'gender',
        'img',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    public function toSearchableArray(): array
    {

        // Customize the data array...

        return [
            'id'        => $this->id,
            'unique_id' => $this->unique_id,
            'name'      => $this->name,
        ];
    }

    public function academics()
    {
        return $this->hasOne(Academic::class);
    }

    public function address()
    {
        return $this->hasOne(Address::class);
    }
    public function guardians()
    {
        return $this->hasOne(Guardian::class);
    }

    public function incomeLogs()
    {
        return $this->hasMany(IncomeLog::class);
    }

    public function expenseLogs()
    {
        return $this->hasMany(ExpenseLog::class);
    }

    public function studentDues()
    {
        return $this->hasMany(StudentDue::class);
    }

    public function studentDiscounts()
    {
        return $this->hasMany(StudentDiscount::class);
    }

    public function classAssign()
    {
        return $this->hasMany(ClassAssign::class);
    }

    public function blogPosts()
    {
        return $this->hasMany(BlogPost::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'user_id');
    }

    public function publishedBlogPosts()
    {
        return $this->hasMany(BlogPost::class)->where('status', 'published');
    }

    public function examMarks()
    {
        return $this->hasMany(ExamMark::class, 'student_id');
    }
}
