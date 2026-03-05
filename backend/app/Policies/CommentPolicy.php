<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CommentPolicy
{
    public function before(User $user, string $ability): bool|null
    {
        // Sécurité anti-banni (au cas où le Middleware serait contourné)
        if ($user->role === 0) {
            return false;
        }

        // Passe-droit Admin (Rôle 3)
        if ($user->role === 3) {
            return true;
        }

        return null; // On passe aux règles ci-dessous pour les rôles 1 et 2
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
    public function view(User $user, Comment $comment): bool
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
     * MODIFIER UN COMMENTAIRE
     * Seul l'auteur exact du commentaire peut modifier son propre texte.
     */
    public function update(User $user, Comment $comment): bool
    {
        return $user->id === $comment->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    /**
     * SUPPRIMER UN COMMENTAIRE
     * 3 personnes ont le droit de le faire :
     * - L'auteur du commentaire
     * - Le modérateur du site (Rôle 2)
     * - L'administrateur du site (Rôle 3) => géré dans la méthode before() en haut
     */
    public function delete(User $user, Comment $comment): bool
    {
        return $user->id === $comment->user_id                 // Je suis l'auteur du comm'
            || $user->role === 2;                              // OU je suis Modérateur
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Comment $comment): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Comment $comment): bool
    {
        return false;
    }
}
