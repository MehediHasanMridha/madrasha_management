<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FeeType>
 */
class FeeTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'Academic Fee',
            'Boarding Fee',
            'Exam Fee',
            'Library Fee',
            'Sports Fee',
        ]);

        return [
            'name'           => $name,
            'slug'           => Str::slug($name),
            'amount'         => fake()->numberBetween(1000, 5000),
            'default_amount' => fake()->numberBetween(1000, 5000),
            'class_id'       => null,
            'department_id'  => null,
            'status'         => true,
            'created_at'     => now(),
            'updated_at'     => now(),
        ];
    }
}
