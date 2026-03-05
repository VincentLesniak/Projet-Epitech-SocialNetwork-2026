<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostPolicy
{

    public function before(User $user, string $ability): bool|null
    {
        // Sécurité anti-banni (au cas où le Middleware serait contourné)
        if ($user->role === 0) {
            return false; 
        }

        // Rôle 3 (Admin) : Passe-droit total, il a tous les droits
        if ($user->role === 3) {
            return true; 
        }
        
        // Pour les rôles 1 (Normal) et 2 (Modérateur), on passe aux règles spécifiques ci-dessous
        return null; 
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Post $post): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * MODIFIER UN POST
     * Le 2 (modérateur) n'a pas le droit de modifier le texte des autres.
     * Donc SEUL l'auteur légitime peut le faire.
     */
    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }

    /**
     * SUPPRIMER UN POST
     * L'auteur peut supprimer son post.
     * OU le 2 (modérateur) peut le supprimer.
     */
    public function delete(User $user, Post $post): bool
    {
        // Si je suis l'auteur OU si mon rôle est 2(modérateur) => action autorisée !
        return $user->id === $post->user_id || $user->role === 2;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Post $post): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Post $post): bool
    {
        return false;
    }
}
