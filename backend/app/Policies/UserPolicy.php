<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy {

    public function before(User $user, string $ability) {
        if ($user->role === 0) {
            return false;
        } // si l'user role  est égal à 0 === banni, return false
        if ($user->role === 3) {
            return true;
        } // si l'user role est égal à 3 === admin, return ture
        return null;
    }

    public function view(User $user, User $model){
        //bonne pratique de laisser ces arguments non utilisé dans le cas où l'on ajoute des fonctionnalité plus ça
        //tout le monde peut voir pour le moment
        // les users permis 1 === user , 2 === moderator peuvent voir  
        return true;
    }

    public function update(User $user, User $model){
        // Définit qu'on ne peut modifier que son propre profil
        // Vérifie que l'user id actuellement connecté est strictement égale au profil ciblé
        return $user->id === $model->id;
    }

    public function delete(User $user, User $model) {
        // Pareil, on ne peut modifier que son propre compte
        return $user->id === $model->id;
    }

    public function forceDelete(User $user, User $model): bool{
        return $user->id === $model->id;
    }
}