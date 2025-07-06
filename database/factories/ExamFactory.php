<?php
namespace Database\Factories;

use App\Models\Department;
use App\Models\FeeType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exam>
 */
class ExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'Midterm Examination',
            'Final Examination',
            'Monthly Test',
            'Unit Test',
            'Annual Examination',
            'Half Yearly Test',
        ]);

        $startDate = fake()->dateTimeBetween('+1 week', '+2 months');
        $endDate   = fake()->dateTimeBetween($startDate, $startDate->format('Y-m-d') . ' +1 week');

        return [
            'name'               => $name,
            'slug'               => Str::slug($name . ' ' . fake()->randomNumber(3)),
            'description'        => fake()->paragraph(),
            'department_id'      => Department::factory(),
            'type'               => fake()->randomElement(['midterm', 'final', 'quiz', 'assessment', 'other']),
            'status'             => fake()->randomElement(['draft', 'scheduled', 'ongoing', 'completed', 'cancelled']),
            'start_date'         => $startDate,
            'end_date'           => $endDate,
            'registration_start' => fake()->dateTimeBetween('now', $startDate),
            'registration_end'   => fake()->dateTimeBetween($startDate, $endDate),
            'fee_type_id'        => null,                // Will be set when exam fee is required
            'is_fee_required'    => fake()->boolean(70), // 70% chance of having fee
            'instructions'       => fake()->sentences(3, true),
            'total_marks'        => fake()->numberBetween(50, 100),
            'pass_marks'         => fake()->numberBetween(30, 60),
            'duration_minutes'   => fake()->numberBetween(60, 180),
            'created_by'         => User::factory(),
            'created_at'         => now(),
            'updated_at'         => now(),
        ];
    }

    /**
     * Indicate that the exam requires a fee.
     */
    public function withFee(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_fee_required' => true,
            'fee_type_id'     => FeeType::factory(),
        ]);
    }

    /**
     * Indicate that the exam does not require a fee.
     */
    public function withoutFee(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_fee_required' => false,
            'fee_type_id'     => null,
        ]);
    }
}
