<?php

namespace App\Http\Controllers;

use App\Models\User; // le modèle pour parler à la table 'users'
use Illuminate\Http\Request; // l'outil pour lire ce que React nous envoie
use Illuminate\Support\Facades\Gate; // sécurité qui va lire UserPolicy
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        // récupère absolument tous les utilisateurs de la base de données.
        $users = User::all();

        // on met tout dans le JSON et on l'envoie à React avec le code 200
        return response()->json([
            'message' => 'Voici la liste de tous les utilisateurs',
            'data' => $users
        ], 200);
    } // utile pour la modale d'invitation dans les groupes et lancer une recherche ciblée, rechercher quelqu'un dans une barre de recherche, etc

    public function show(User $user)
    {
        //(User $user) permet de récupérer la "totalité" des informations de l'utilisateur en utilisant le principe de Route Model Binding

        // Gate lit la règle 'view' dans UserPolicy sur le profil $user.
        Gate::authorize('view', $user);

        //récupère les group dont l'utilisateur fait partie
        $user->groups;

        // Si le gate est passé, le code continue ici et le profil trouvé est renvoyé
        return response()->json([
            'message' => 'Profil trouvé',
            'data' => $user
        ], 200);
    }

    public function update(Request $request, User $user)
    {
        // On demande à gate de lire la règle 'update' de UserPolicy et de comparer le visiteur avec la cible $user
        // S'ils sont différents, Gate le code s'arrête et le serveur renverra une 403
        Gate::authorize('update', $user);

        // Si l'user a le droit d'être là, on vérifie que ce qu'il a tapé est correct.
        $validated = $request->validate([
            'first_name'    => 'sometimes|required|string|max:50',
            'last_name'     => 'sometimes|required|string|max:50',
            'mail'          => 'sometimes|required|email|unique:users,mail,' . $user->id,//verifie que le mail est unique dans la table users, sauf pour l'utilisateur en cours ($user->id)
            'birthdate'     => 'sometimes|date',
            'profil_pic'    => 'sometimes|image|mimes:jpeg,png,jpg,webp|max:2048',
            'password'      => 'sometimes|nullable|string|min:8'
            // 'sometimes' veut dire : "S'il n'envoie pas de prénom, on garde l'ancien.
            // et obligé de ne pas le laisser vide par le required
        ]);

        // Si un fichier "profil_pic" a été envoyé
        if ($request->hasFile('profil_pic')) {

            // que l'utilisateur avait déjà une photo, on la supprime du disque
            if ($user->profil_pic) {
                Storage::disk('public')->delete($user->profil_pic);
            }

            // sauvegarde la nouvelle image dans un dossier (ex: "profil_pics")
            $cheminImage = $request->file('profil_pic')->store('profil_pics', 'public');

            // puis ajoute ce chemin dans les données à sauvegarder en BDD
            $validated['profil_pic'] = $cheminImage;
        }

        // fonction filled() vérifie si le champ 'password' est présent et n'est pas vide
        if ($request->filled('password')) {
            // Quand l'utilisateur a tapé un mot de passe, on le crypte et on remplace le texte en clair dans $validated
            $validated['password'] = Hash::make($request->password);
        } else {
            // autrement si le champ est vide (ou non envoyé), on le retire du tableau $validated 
            // pour être sûr que Laravel n'écrase pas l'ancien mot de passe
            unset($validated['password']);
        }

        // mise à jour du profil tu Update les données qui sont dans $validated vers $user
        $user->update($validated);

        //envoie la réponse 
        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'data' => $user
        ], 200);
    }

    public function deleteProfilPic(User $user)
    {

        Gate::authorize('update', $user);

        if ($user->profil_pic) {
            Storage::disk('public')->delete($user->profil_pic);
        }

        $user->update(['profil_pic' => null]);

        return response()->json([
            'message' => 'Photo de profil supprimée avec succès',
            'data' => $user
        ], 200);
    }


    public function destroy(User $user) {
        // gate vérifie les polocies et applique les droits 
        Gate::authorize('delete', $user);
        // retire les likes de l'user
        $user->likedPosts()->detach(); 
        // change la définition du lien avec les posts pour les rendre orphelins
        $user->posts()->update(['user_id' => null]);
        $user->comments()->update(['user_id' => null]);
        // destruction de l'utilisateur définitive en gardant ses posts
        $user->delete();
        
        return response()->json([
            'message' => 'Compte supprimé définitivement. Vos posts et commentaires ont été conservés.'
        ]);
    }

    public function forceDestroy(User $user) {
        Gate::authorize('delete', $user);
        $user->likedPosts()->detach(); 
        $user->posts()->delete(); 
        $user->comments()->delete(); 
        $user->delete(); 
        
        return response()->json([
            'message' => 'Compte et contenu définitivement supprimés.'
        ]);
    }
}
