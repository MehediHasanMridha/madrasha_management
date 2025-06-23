<?php
namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use App\Models\User;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample categories
        $categories = [
            [
                'name'        => 'Technology',
                'slug'        => 'technology',
                'description' => 'Latest technology trends and updates',
                'color'       => '#3B82F6',
                'is_active'   => true,
            ],
            [
                'name'        => 'Education',
                'slug'        => 'education',
                'description' => 'Educational content and resources',
                'color'       => '#10B981',
                'is_active'   => true,
            ],
            [
                'name'        => 'Science',
                'slug'        => 'science',
                'description' => 'Scientific discoveries and research',
                'color'       => '#8B5CF6',
                'is_active'   => true,
            ],
            [
                'name'        => 'Health',
                'slug'        => 'health',
                'description' => 'Health and wellness tips',
                'color'       => '#EF4444',
                'is_active'   => true,
            ],
        ];

        foreach ($categories as $category) {
            BlogCategory::create($category);
        }

        // Create sample tags
        $tags = [
            ['name' => 'Programming', 'slug' => 'programming', 'color' => '#F59E0B'],
            ['name' => 'Web Development', 'slug' => 'web-development', 'color' => '#06B6D4'],
            ['name' => 'AI & ML', 'slug' => 'ai-ml', 'color' => '#8B5CF6'],
            ['name' => 'Tutorial', 'slug' => 'tutorial', 'color' => '#10B981'],
            ['name' => 'Tips', 'slug' => 'tips', 'color' => '#F97316'],
            ['name' => 'News', 'slug' => 'news', 'color' => '#EF4444'],
            ['name' => 'Research', 'slug' => 'research', 'color' => '#6366F1'],
            ['name' => 'Innovation', 'slug' => 'innovation', 'color' => '#EC4899'],
        ];

        foreach ($tags as $tag) {
            BlogTag::create($tag);
        }

        // Get the first user (assuming there's at least one user)
        $user = User::first();

        if (! $user) {
            $user = User::create([
                'name'     => 'Blog Admin',
                'email'    => 'admin@blog.com',
                'password' => bcrypt('password'),
            ]);
        }

        // Create sample blog posts
        $posts = [
            [
                'title'            => 'Introduction to Laravel Blog Development',
                'slug'             => 'introduction-to-laravel-blog-development',
                'excerpt'          => 'Learn how to build a modern blog system with Laravel framework.',
                'content'          => '<p>Laravel is a powerful PHP framework that makes web development a breeze. In this comprehensive guide, we\'ll walk through building a complete blog system from scratch.</p>

                <h2>What You\'ll Learn</h2>
                <ul>
                    <li>Setting up Laravel project</li>
                    <li>Creating database migrations</li>
                    <li>Building Eloquent models</li>
                    <li>Implementing CRUD operations</li>
                    <li>Adding authentication</li>
                </ul>

                <p>By the end of this tutorial, you\'ll have a fully functional blog with categories, tags, and user management.</p>',
                'status'           => 'published',
                'published_at'     => now()->subDays(5),
                'is_featured'      => true,
                'user_id'          => $user->id,
                'blog_category_id' => 1, // Technology
            ],
            [
                'title'            => 'Best Practices for Modern Web Development',
                'slug'             => 'best-practices-for-modern-web-development',
                'excerpt'          => 'Discover the essential practices every web developer should follow in 2025.',
                'content'          => '<p>Web development is evolving rapidly, and staying up-to-date with best practices is crucial for building maintainable and scalable applications.</p>

                <h2>Key Practices</h2>
                <ol>
                    <li><strong>Code Organization:</strong> Keep your code modular and well-structured</li>
                    <li><strong>Security:</strong> Always validate and sanitize user input</li>
                    <li><strong>Performance:</strong> Optimize for speed and efficiency</li>
                    <li><strong>Accessibility:</strong> Make your sites usable for everyone</li>
                </ol>

                <p>Following these practices will help you create better web applications that users love.</p>',
                'status'           => 'published',
                'published_at'     => now()->subDays(3),
                'is_featured'      => false,
                'user_id'          => $user->id,
                'blog_category_id' => 1, // Technology
            ],
            [
                'title'            => 'The Future of Online Education',
                'slug'             => 'the-future-of-online-education',
                'excerpt'          => 'Exploring how technology is reshaping the educational landscape.',
                'content'          => '<p>Online education has transformed dramatically in recent years, especially after the global pandemic. Let\'s explore what the future holds.</p>

                <h2>Emerging Trends</h2>
                <ul>
                    <li>Virtual Reality classrooms</li>
                    <li>AI-powered personalized learning</li>
                    <li>Micro-credentials and digital badges</li>
                    <li>Interactive simulations</li>
                </ul>

                <p>These innovations are making education more accessible and engaging than ever before.</p>',
                'status'           => 'published',
                'published_at'     => now()->subDays(1),
                'is_featured'      => true,
                'user_id'          => $user->id,
                'blog_category_id' => 2, // Education
            ],
        ];

        foreach ($posts as $postData) {
            $post = BlogPost::create($postData);

            // Attach random tags to each post
            $randomTags = BlogTag::inRandomOrder()->limit(rand(2, 4))->pluck('id');
            $post->tags()->attach($randomTags);
        }

        $this->command->info('Blog seeder completed successfully!');
    }
}
