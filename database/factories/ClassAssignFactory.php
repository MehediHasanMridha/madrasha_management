<?php
namespace Database\Factories;

use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClassAssign>
 */
class ClassAssignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'    => User::factory(),
            'dept_id'    => Department::factory(),
            'class_id'   => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
