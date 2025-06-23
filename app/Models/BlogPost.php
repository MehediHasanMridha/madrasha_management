<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'gallery_images',
        'status',
        'published_at',
        'views_count',
        'likes_count',
        'meta_data',
        'is_featured',
        'allow_comments',
        'user_id',
        'blog_category_id',
    ];

    protected $casts = [
        'published_at'   => 'datetime',
        'gallery_images' => 'array',
        'meta_data'      => 'array',
        'is_featured'    => 'boolean',
        'allow_comments' => 'boolean',
        'views_count'    => 'integer',
        'likes_count'    => 'integer',
    ];

    protected $dates = [
        'published_at',
        'deleted_at',
    ];

    // Automatically generate slug when creating/updating
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }

            // Set published_at if status is published and published_at is not set
            if ($post->status === 'published' && ! $post->published_at) {
                $post->published_at = now();
            }
        });

        static::updating(function ($post) {
            if ($post->isDirty('title') && empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }

            // Set published_at when status changes to published
            if ($post->isDirty('status') && $post->status === 'published' && ! $post->published_at) {
                $post->published_at = now();
            }
        });
    }

    // Relationships
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class, 'blog_category_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(BlogTag::class, 'blog_post_tags');
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->where('published_at', '<=', now());
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeByCategory($query, $categorySlug)
    {
        return $query->whereHas('category', function ($q) use ($categorySlug) {
            $q->where('slug', $categorySlug);
        });
    }

    public function scopeByTag($query, $tagSlug)
    {
        return $query->whereHas('tags', function ($q) use ($tagSlug) {
            $q->where('slug', $tagSlug);
        });
    }

    public function scopeByAuthor($query, $authorId)
    {
        return $query->where('user_id', $authorId);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
                ->orWhere('content', 'like', "%{$search}%")
                ->orWhere('excerpt', 'like', "%{$search}%");
        });
    }

    // Mutators & Accessors
    public function getReadingTimeAttribute()
    {
        $words = str_word_count(strip_tags($this->content));
        return ceil($words / 200); // Assuming 200 words per minute
    }

    public function getIsPublishedAttribute()
    {
        return $this->status === 'published' && $this->published_at <= now();
    }

    public function getFormattedPublishedDateAttribute()
    {
        return $this->published_at ? $this->published_at->format('F j, Y') : null;
    }

    public function getExcerptOrContentAttribute()
    {
        return $this->excerpt ?: Str::limit(strip_tags($this->content), 150);
    }

    // Methods
    public function incrementViews()
    {
        $this->increment('views_count');
    }

    public function incrementLikes()
    {
        $this->increment('likes_count');
    }

    public function publish()
    {
        $this->update([
            'status'       => 'published',
            'published_at' => now(),
        ]);
    }

    public function unpublish()
    {
        $this->update([
            'status' => 'draft',
        ]);
    }

    // Accessor for route model binding
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
