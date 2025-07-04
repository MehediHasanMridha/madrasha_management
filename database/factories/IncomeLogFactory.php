<?php
namespace Database\Factories;

use App\Models\FeeType;
use App\Models\PaymentMethod;
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
            'source_type'       => fake()->randomElement(['student', 'donation', 'sponsor', 'other']),
            'source_details'    => fake()->sentence(),
            'amount'            => fake()->numberBetween(1000, 5000),
            'fee_type_id'       => FeeType::factory(),
            'payment_method_id' => PaymentMethod::factory(),
            'payment_period'    => fake()->date('Y-m'),
            'status'            => 'paid',
            'receiver_id'       => User::factory(),
            'created_at'        => now(),
            'updated_at'        => now(),
        ];
    }
}
