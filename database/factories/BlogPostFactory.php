<?php
namespace Database\Factories;

use App\Models\BlogCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogPost>
 */
class BlogPostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title   = $this->faker->sentence(rand(4, 8));
        $content = $this->faker->paragraphs(rand(5, 10), true);

        return [
            'title'            => $title,
            'slug'             => Str::slug($title),
            'excerpt'          => $this->faker->paragraph(3),
            'content'          => '<p>' . str_replace("\n\n", '</p><p>', $content) . '</p>',
            'featured_image'   => $this->faker->optional(0.7)->imageUrl(800, 400, 'blog'),
            'gallery_images'   => $this->faker->optional(0.3)->passthrough([
                $this->faker->imageUrl(600, 300, 'gallery'),
                $this->faker->imageUrl(600, 300, 'gallery'),
            ]),
            'status'           => $this->faker->randomElement(['draft', 'published', 'archived']),
            'published_at'     => $this->faker->optional(0.8)->dateTimeBetween('-6 months', 'now'),
            'views_count'      => $this->faker->numberBetween(0, 1000),
            'likes_count'      => $this->faker->numberBetween(0, 100),
            'meta_data'        => [
                'meta_title'       => $title,
                'meta_description' => $this->faker->sentence(15),
                'meta_keywords'    => implode(', ', $this->faker->words(5)),
            ],
            'is_featured'      => $this->faker->boolean(20), // 20% chance of being featured
            'allow_comments'   => $this->faker->boolean(90), // 90% chance of allowing comments
            'user_id'          => User::factory(),
            'blog_category_id' => BlogCategory::factory(),
        ];
    }

    /**
     * Indicate that the blog post is published.
     */
    public function published(): static
    {
        return $this->state(fn(array $attributes) => [
            'status'       => 'published',
            'published_at' => $this->faker->dateTimeBetween('-3 months', 'now'),
        ]);
    }

    /**
     * Indicate that the blog post is featured.
     */
    public function featured(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the blog post is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn(array $attributes) => [
            'status'       => 'draft',
            'published_at' => null,
        ]);
    }
}
