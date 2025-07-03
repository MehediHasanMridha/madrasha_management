<?php
namespace Database\Factories;

use App\Models\FeeType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\IncomeLog>
 */
class IncomeLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'           => User::factory(),
            'student_id'        => function (array $attributes) {
                return $attributes['user_id'];
            },
            'source_type'       => 'fee_payment',
            'source_details'    => fake()->sentence(),
            'amount'            => fake()->numberBetween(1000, 5000),
            'fee_type_id'       => FeeType::factory(),
            'payment_method_id' => null,
            'payment_period'    => fake()->date('Y-m'),
            'status'            => 'paid',
            'receiver_id'       => User::factory(),
            'created_at'        => now(),
            'updated_at'        => now(),
        ];
    }
}
