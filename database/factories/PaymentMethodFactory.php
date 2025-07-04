<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentMethod>
 */
class PaymentMethodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'Cash',
            'Bank Transfer',
            'Mobile Banking',
            'Credit Card',
            'Debit Card',
            'Cheque',
        ]);

        return [
            'name'       => $name,
            'slug'       => Str::slug($name),
            'is_active'  => true,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
