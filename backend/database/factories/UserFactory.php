<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'last_name' => fake()->lastName(),
        'first_name' => fake()->firstName(),
        'mail' => fake()->unique()->safeEmail(),
        'birthdate' => fake()->date(),
        'password' => static::$password ??= \Illuminate\Support\Facades\Hash::make('password'),
        'role' => 1, // 1 pour utilisateur normal
    ];
}

    // Ajoute cette méthode après definition()

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
