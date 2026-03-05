<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    public function definition(): array
    {
        return [
            'message' => fake()->paragraph(1), // Un texte aléatoire
            'post_picture' => null, // On laisse vide pour le moment (blob)
            'user_id' => User::factory(), // Crée un user si aucun n'est fourni
            'group_id' => null, // Sera rempli par le Seeder
        ];
    }
    public function anonymous(): static
    {
        return $this->state(fn(array $attributes) => [
            'user_id' => null,
        ]);
    }
}