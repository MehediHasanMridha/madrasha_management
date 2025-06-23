<?php
namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the blog posts.
     */
    public function index(Request $request)
    {
        $query = BlogPost::with(['author', 'category', 'tags'])
            ->latest('published_at');

        // Search functionality
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        // Filter by tag
        if ($request->filled('tag')) {
            $query->byTag($request->tag);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        } else {
            // Default to published posts for non-admin users
            if (! Auth::user()->hasRole('admin')) {
                $query->published();
            }
        }

        // Filter by author
        if ($request->filled('author')) {
            $query->byAuthor($request->author);
        }

        $blogs = $query->paginate(12)->withQueryString();
        // Get categories and tags for filters
        $categories = BlogCategory::where('is_active', true)->get();
        $tags       = BlogTag::where('is_active', true)->get();

        return Inertia::render('admin::blogs/index', [
            'blogs'      => $blogs,
            'categories' => $categories,
            'tags'       => $tags,
            'filters'    => $request->only(['search', 'category', 'tag', 'status', 'author']),
        ]);
    }

    /**
     * Show the form for creating a new blog post.
     */
    public function create()
    {
        $categories = BlogCategory::where('is_active', true)->get();
        $tags       = BlogTag::where('is_active', true)->get();

        return Inertia::render('admin::blogs/create', [
            'categories' => $categories,
            'tags'       => $tags,
        ]);
    }

    /**
     * Store a newly created blog post in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'                      => 'required|string|max:255',
            'slug'                       => 'nullable|string|max:255|unique:blog_posts,slug',
            'excerpt'                    => 'nullable|string|max:500',
            'content'                    => 'required|string',
            'featured_image'             => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4096',
            'gallery_images.*'           => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4096',
            'status'                     => 'nullable|in:draft,published,scheduled',
            'published_at'               => 'nullable|date|after_or_equal:now',
            'blog_category_id'           => 'nullable|exists:blog_categories,id',
            'tags'                       => 'nullable|array',
            'tags.*'                     => 'string|max:50',
            'is_featured'                => 'nullable|boolean',
            'allow_comments'             => 'nullable|boolean',
            'meta_data'                  => 'nullable|array',
            'meta_data.meta_title'       => 'nullable|string|max:60',
            'meta_data.meta_description' => 'nullable|string|max:160',
            'meta_data.meta_keywords'    => 'nullable|string|max:255',
        ]);

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Set default values
        $validated['status']         = $validated['status'] ?? 'draft';
        $validated['is_featured']    = $validated['is_featured'] ?? false;
        $validated['allow_comments'] = $validated['allow_comments'] ?? true;

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = uploadImage(null, $request->file('featured_image'), 'uploads/blog_images/');
        }

        // Handle gallery images upload
        if ($request->hasFile('gallery_images')) {
            $galleryImages = [];
            foreach ($request->file('gallery_images') as $image) {
                $galleryImages[] = $image->store('blog/gallery', 'public');
            }
            $validated['gallery_images'] = $galleryImages;
        }

        // Set author
        $validated['user_id'] = Auth::id();

        // Handle tags - create or find existing tags
        $tagIds = [];
        if (! empty($validated['tags'])) {
            foreach ($validated['tags'] as $tagName) {
                $tag = BlogTag::firstOrCreate(
                    ['name' => trim($tagName)],
                    [
                        'slug'      => Str::slug(trim($tagName)),
                        'is_active' => true,
                    ]
                );
                $tagIds[] = $tag->id;
            }
        }

        // Remove tags from validated data as it's handled separately
        unset($validated['tags']);

        // Create the blog post
        $blogPost = BlogPost::create($validated);

        // Attach tags if provided
        if (! empty($tagIds)) {
            $blogPost->tags()->attach($tagIds);
        }

        return redirect()->route('blogs.index')
            ->with('success', 'Blog post created successfully!');
    }

    /**
     * Display the specified blog post.
     */
    public function show(BlogPost $blog)
    {
        $blog->load(['author', 'category', 'tags']);

        // Increment view count
        $blog->incrementViews();

        // Get related posts
        $relatedPosts = BlogPost::published()
            ->where('id', '!=', $blog->id)
            ->where('blog_category_id', $blog->blog_category_id)
            ->limit(4)
            ->get();

        return Inertia::render('admin::blogs/show', [
            'blog'         => $blog,
            'relatedPosts' => $relatedPosts,
        ]);
    }
    public function showApi(BlogPost $blog)
    {
        $blog->load(['author', 'category', 'tags']);

        // Increment view count
        $blog->incrementViews();

        // Get related posts
        $relatedPosts = BlogPost::published()
            ->where('id', '!=', $blog->id)
            ->where('blog_category_id', $blog->blog_category_id)
            ->limit(4)
            ->get();

        return response()->json([
            'blog'         => $blog,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    /**
     * Show the form for editing the specified blog post.
     */
    public function edit(BlogPost $blog)
    {
        $blog->load(['tags']);
        $categories = BlogCategory::where('is_active', true)->get();
        $tags       = BlogTag::where('is_active', true)->get();

        return Inertia::render('admin::blogs/edit', [
            'blog'         => $blog,
            'categories'   => $categories,
            'tags'         => $tags,
            'selectedTags' => $blog->tags->pluck('id')->toArray(),
        ]);
    }

    /**
     * Update the specified blog post in storage.
     */
    public function update(Request $request, $blog_slug)
    {
        // Find the blog post by slug
        $blog = BlogPost::where('slug', $blog_slug)->firstOrFail();

        $validated = $request->validate([
            'title'                      => 'required|string|max:255',
            'slug'                       => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('blog_posts', 'slug')->ignore($blog->id),
            ],
            'excerpt'                    => 'nullable|string|max:500',
            'content'                    => 'required|string',
            'gallery_images.*'           => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4096',
            'status'                     => 'nullable|in:draft,published,scheduled',
            'published_at'               => 'nullable|date|after_or_equal:now',
            'blog_category_id'           => 'nullable|exists:blog_categories,id',
            'tags'                       => 'nullable|array',
            'tags.*'                     => 'string|max:50',
            'is_featured'                => 'nullable|boolean',
            'allow_comments'             => 'nullable|boolean',
            'meta_data'                  => 'nullable|array',
            'meta_data.meta_title'       => 'nullable|string|max:60',
            'meta_data.meta_description' => 'nullable|string|max:160',
            'meta_data.meta_keywords'    => 'nullable|string|max:255',
            'remove_featured_image'      => 'boolean',
            'remove_gallery_images'      => 'nullable|array',
        ]);

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Set default values
        $validated['status']         = $validated['status'] ?? 'draft';
        $validated['is_featured']    = $validated['is_featured'] ?? false;
        $validated['allow_comments'] = $validated['allow_comments'] ?? true;

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $request->validate([
                'featured_image' => 'image|mimes:jpeg,png,jpg,gif|max:4096',
            ]);
            $validated['featured_image'] = uploadImage($blog->featured_image, $request->file('featured_image'), 'uploads/blog_images/');
        }

        // Handle remove featured image
        if ($request->boolean('remove_featured_image')) {
            if ($blog->featured_image) {
                Storage::disk('public')->delete($blog->featured_image);
            }
            $validated['featured_image'] = null;
        }

        // Handle gallery images upload
        if ($request->hasFile('gallery_images')) {
            $galleryImages = $blog->gallery_images ?? [];
            foreach ($request->file('gallery_images') as $image) {
                $galleryImages[] = $image->store('blog/gallery', 'public');
            }
            $validated['gallery_images'] = $galleryImages;
        }

        // Handle remove gallery images
        if ($request->filled('remove_gallery_images')) {
            $currentGallery = $blog->gallery_images ?? [];
            $toRemove       = $request->input('remove_gallery_images', []);

            foreach ($toRemove as $imagePath) {
                Storage::disk('public')->delete($imagePath);
                $currentGallery = array_filter($currentGallery, fn($img) => $img !== $imagePath);
            }

            $validated['gallery_images'] = array_values($currentGallery);
        }

        // Handle tags - create or find existing tags (same as store method)
        $tagIds = [];
        if (! empty($validated['tags'])) {
            foreach ($validated['tags'] as $tagName) {
                $tag = BlogTag::firstOrCreate(
                    ['name' => trim($tagName)],
                    [
                        'slug'      => Str::slug(trim($tagName)),
                        'is_active' => true,
                    ]
                );
                $tagIds[] = $tag->id;
            }
        }

        // Remove tags from validated data as it's handled separately
        unset($validated['tags']);

        // Update the blog post
        $blog->update($validated);

        // Sync tags
        if (! empty($tagIds)) {
            $blog->tags()->sync($tagIds);
        } else {
            $blog->tags()->detach();
        }

        return redirect()->route('blogs.index')
            ->with('success', 'Blog post updated successfully!');
    }

    /**
     * Remove the specified blog post from storage.
     */
    public function destroy(BlogPost $blog)
    {
        // Delete associated images
        if ($blog->featured_image) {
            $imagePath = public_path('uploads/blog_images/' . $blog->featured_image);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        if ($blog->gallery_images) {
            foreach ($blog->gallery_images as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        // Detach tags
        $blog->tags()->detach();

        // Delete the blog post
        $blog->delete();

        return redirect()->route('blogs.index')
            ->with('success', 'Blog post deleted successfully!');
    }

    /**
     * Publish a blog post.
     */
    public function publish(BlogPost $blog)
    {
        $blog->publish();

        return redirect()->back()
            ->with('success', 'Blog post published successfully!');
    }

    /**
     * Unpublish a blog post.
     */
    public function unpublish(BlogPost $blog)
    {
        $blog->unpublish();

        return redirect()->back()
            ->with('success', 'Blog post unpublished successfully!');
    }

    /**
     * Toggle featured status of a blog post.
     */
    public function toggleFeatured(BlogPost $blog)
    {
        $blog->update(['is_featured' => ! $blog->is_featured]);

        $status = $blog->is_featured ? 'featured' : 'unfeatured';

        return redirect()->back()
            ->with('success', "Blog post {$status} successfully!");
    }

    /**
     * Bulk actions for blog posts.
     */
    public function bulkAction(Request $request)
    {
        $request->validate([
            'action' => 'required|in:delete,publish,unpublish,feature,unfeature',
            'ids'    => 'required|array',
            'ids.*'  => 'exists:blog_posts,id',
        ]);

        $blogPosts = BlogPost::whereIn('id', $request->ids);

        switch ($request->action) {
            case 'delete':
                foreach ($blogPosts->get() as $blog) {
                    $this->destroy($blog);
                }
                $message = 'Selected blog posts deleted successfully!';
                break;

            case 'publish':
                $blogPosts->update([
                    'status'       => 'published',
                    'published_at' => now(),
                ]);
                $message = 'Selected blog posts published successfully!';
                break;

            case 'unpublish':
                $blogPosts->update(['status' => 'draft']);
                $message = 'Selected blog posts unpublished successfully!';
                break;

            case 'feature':
                $blogPosts->update(['is_featured' => true]);
                $message = 'Selected blog posts featured successfully!';
                break;

            case 'unfeature':
                $blogPosts->update(['is_featured' => false]);
                $message = 'Selected blog posts unfeatured successfully!';
                break;
        }

        return redirect()->back()->with('success', $message);
    }
}
