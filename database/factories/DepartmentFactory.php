<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Department>
 */
class DepartmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Computer Science',
            'Business Administration',
            'English Literature',
            'Mathematics',
            'Physics',
            'Chemistry',
            'Biology',
            'History',
            'Economics',
            'Psychology',
        ]);

        return [
            'name'       => $name,
            'slug'       => Str::slug($name),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
