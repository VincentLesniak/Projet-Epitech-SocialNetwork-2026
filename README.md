# ConnectIn

ConnectIn est une application de réseau social professionnelle séparée en deux parties : une API RESTful robuste développée avec **Laravel** et une interface utilisateur dynamique construite avec **React**.

L'application permet aux utilisateurs de s'inscrire, de publier des posts (avec images), d'interagir via des likes et des commentaires, et intègre un système complet de gestion des rôles et de modération.

---

## Fonctionnalités Principales

* **Authentification Sécurisée :** Inscription, connexion et déconnexion gérées par API tokens via **Laravel Sanctum**.
* **Gestion des Rôles (RBAC) :**
    * `0` : **Banni** (Accès bloqué par le Middleware `CheckBanned` avec révocation de token).
    * `1` : **Utilisateur** (Peut créer, modifier et supprimer ses propres contenus).
    * `2` : **Modérateur** (Peut supprimer les contenus inappropriés des autres utilisateurs).
    * `3` : **Administrateur** (Passe-droit total sur l'application via la méthode `before`).
* **posts & Commentaires :** Création de publications avec upload d'images et système de commentaires avec règles de suppression étendues pour les auteurs de posts.
* **Interactions :** Système de "J'aime" (Like/Unlike) sur les publications via une table pivot.
* **Profils Utilisateurs :** Mise à jour des informations personnelles avec validation.

---

## Stack Technique

**Backend (API) :**
* PHP 8.x / Laravel 11
* MySQL
* Laravel Sanctum (Authentification)
* Middlewares & Policies personnalisés pour la sécurité applicative

**Frontend (Client) :**
* React
* Axios (Appels API configurés avec le header `Accept: application/json`)

---

## 🚀 Installation & Lancement en local



### Configuration du Backend (Laravel)

1.  Ouvrez un terminal dans le dossier `backend` :
    ```bash
    composer install
    cp .env_example .env
    php artisan key:generate
    ```
2.  Configurez votre base de données dans le fichier `.env`.
3.  Lancez les migrations et créez le lien de stockage :
    ```bash
    php artisan migrate --seed
    php artisan storage:link
    ```
4.  Lancez le serveur :
    ```bash
    php artisan serve
    ```

### Configuration du Frontend (React)

1.  Ouvrez un terminal dans le dossier `frontend` :
    ```bash
    npm install
    ```
2.  Lancez le serveur de développement :
    ```bash
    npm run dev
    ```

---

## Documentation API & Tests

Pour tester l'API via **Postman**, importer dans postman :
[fichier postman](postman.json)

---

## Sécurité

L'application implémente un **Middleware `CheckBanned`** qui vérifie le rôle de l'utilisateur à chaque requête entrante. Si un utilisateur possède le rôle `0`, ses tokens sont immédiatement supprimés et l'accès est refusé avec une erreur 403 Forbidden.

L'authentification et la sécurité de l'API sont gérées par Laravel Sanctum via un système léger de jetons (tokens).
