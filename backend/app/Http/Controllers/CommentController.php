<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    /**
     * Display a listing of comments for a specific post.
     * (Habituellement, on récupère les commentaires via la route du post,
     * mais voici une méthode pour lister tous les commentaires si besoin).
     */
    public function index()
    {
        // On récupère les commentaires avec l'auteur et le post associé
        $comments = Comment::with(['user:id,first_name,last_name,profil_pic', 'post:id'])
            ->latest() // Les plus récents en premier
            ->get();

        return response()->json($comments);
    }

    /**
     * Store a newly created comment in storage.
     */
    public function store(Request $request)
    {
        // Validation : On s'assure que le message est présent et que le post existe
        $validated = $request->validate([
            'message' => 'required|string|max:255',
            'post_id' => 'required|exists:posts,id',
        ]);

        try {
            // Création du commentaire
            $comment = Comment::create([
                'message' => $validated['message'],
                'post_id' => $validated['post_id'],
                'user_id' => auth()->id(), // On prend l'ID de l'utilisateur connecté
            ]);

            // On renvoie le commentaire avec les infos de son auteur pour React
            return response()->json([
                'message' => 'Commentaire ajouté avec succès !',
                'data' => $comment->load('user:id,first_name,last_name,profil_pic')
            ], 201);

        } catch (\Exception $e) {
            Log::error("Erreur création commentaire : " . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de l\'ajout du commentaire.',
                'error' => $e->getMessage()
            ], );
        }
    }

    /**
     * Display the specified comment.
     */
    public function show(Comment $comment)
    {
        $comment = $comment->load(['user:id,first_name,last_name,profil_pic', 'post:id']);
        return response()->json($comment);
    }

    /**
     * Update the specified comment in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        Gate::authorize('update', $comment);
        // Validation : On ne permet de modifier que le message
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        // Vérification de sécurité (optionnelle mais recommandée) : 
        // S'assurer que seul l'auteur peut modifier son commentaire
        /*
        if (auth()->id() !== $comment->user_id) {
            return response()->json(['message' => 'Non autorisé.'], 403);
        }
        */

        try {
            $comment->update($validated);
            
            return response()->json([
                'message' => 'Commentaire mis à jour.',
                'data' => $comment->load('user:id,first_name,last_name,profil_pic')
            ], 200);

        } catch (\Exception $e) {
            Log::error("Erreur mise à jour commentaire : " . $e->getMessage());
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du commentaire.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified comment from storage.
     */
    public function destroy(Comment $comment)
    {
       Gate::authorize('delete', $comment);
        try {
            $comment->delete();
            return response()->json(['message' => 'Commentaire supprimé avec succès.'], 200);

        } catch (\Exception $e) {
            Log::error("Erreur suppression commentaire : " . $e->getMessage());
            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression du commentaire.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
