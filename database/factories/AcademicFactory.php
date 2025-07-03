<?php
namespace Database\Factories;

use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Academic>
 */
class AcademicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'department_id' => Department::factory(),
            'student_id'    => User::factory(),
            'user_id'       => function (array $attributes) {
                return $attributes['student_id'];
            },
            'class_id'      => null,
            'academic_fee'  => fake()->numberBetween(3000, 8000),
            'boarding_fee'  => fake()->numberBetween(2000, 5000),
            'created_at'    => now(),
            'updated_at'    => now(),
        ];
    }
}
