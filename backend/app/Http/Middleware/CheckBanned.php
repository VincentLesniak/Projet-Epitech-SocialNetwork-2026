<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckBanned
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // On vérifie si l'utilisateur est connecté ET si son rôle est 0 (Banni)
        if (auth()->check() && auth()->user()->role === 0) {
            
            // On lui supprime tous ses tokens pour le déconnecter de force et éviter qu'il puisse faire des requêtes avec un token encore valide
            $request->user()->tokens()->delete();

            // On lui renvoie une belle erreur JSON
            return response()->json([
                'message' => 'Accès refusé. Votre compte a été banni pour non-respect des règles.'
            ], 403);
        }

        // Si tout va bien (rôle 1, 2 ou 3), on laisse la requête continuer son chemin
        return $next($request);
    }
}