<?php
namespace Database\Factories;

use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Classes>
 */
class ClassesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'Class 1',
            'Class 2',
            'Class 3',
            'Class 4',
            'Class 5',
            'Class 6',
            'Class 7',
            'Class 8',
            'Class 9',
            'Class 10',
            'Advanced Level',
            'Beginner Level',
        ]);

        return [
            'name'          => $name,
            'slug'          => Str::slug($name . ' ' . fake()->randomNumber(3)),
            'des'           => fake()->sentence(),
            'img'           => null,
            'department_id' => Department::factory(),
            'created_at'    => now(),
            'updated_at'    => now(),
        ];
    }
}
