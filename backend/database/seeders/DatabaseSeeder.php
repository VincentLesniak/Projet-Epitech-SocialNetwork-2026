<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Group;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // On crée les users et on les stocke dans une variable
        $users = User::factory(10)->create();

        $groups = collect(['Laravel France', 'React Devs', 'Gaming Area'])->map(function ($name) {
            return Group::create([
                'group_name' => $name,
                'description' => "Bienvenue dans le groupe $name !",
            ]);
        });

        // On passe la variable $users existante aux boucles
        $users->each(function ($user) use ($groups, $users) {
            $posts = Post::factory(3)->create([
                'user_id' => $user->id,
                'group_id' => $groups->random()->group_name,
            ]);

            $posts->each(function ($post) use ($users) {
                // COMMENTAIRES
                Comment::factory(2)->create([
                    'post_id' => $post->id,
                    // ON UTILISE LA VARIABLE $users DÉJÀ EN MÉMOIRE
                    'user_id' => $users->random()->id,
                ]);

                // LIKES
                // On tire au sort des IDs parmi la collection existante
                $post->likers()->attach(
                    $users->random(rand(1, 5))->pluck('id')
                );
            });

            // GROUPES
            $user->groups()->attach(
                $groups->random(rand(1, 2))->pluck('group_name')
            );
        });
    }

    /**
     * Fonction helper pour éviter la répétition de code pour les likes/commentaires
     */
    private function seedInteractions($posts, $users)
    {
        $posts->each(function ($post) use ($users) {
            // Commentaires par des users aléatoires
            Comment::factory(2)->create([
                'post_id' => $post->id,
                'user_id' => $users->random()->id,
            ]);

            // Likes via la table pivot
            $post->likers()->attach(
                $users->random(rand(1, 5))->pluck('id')
            );
        });
    }
}