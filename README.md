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


--- 

# Des images de l'organisation de l'équipe et des façons de travailler :



**Gestion de projet & Collaboration (Git)**

* Utilisation de la méthode **Kanban** (Tableau avec To Do, In Progress, Done).
* Utilisation du **Git Flow** (Séparation en branches `main`, `develop`, et branches de fonctionnalités `feat/...`).
* Validation par **Pull Requests (PR)** avec revue de code (Statut *Approved* avant le merge).
* Utilisation des **Conventional Commits** (ex: `feat: add login`, `build: ...`).
* **Documentation détaillée** des Pull Requests (explication claire de ce qui a été modifié par fichier).

**Conception (UI/UX)**

* Création de **Wireframes** (maquettes filaires) avant de coder.
* Réflexion **Responsive** (Interfaces pensées pour le Mobile et le Desktop).

**Architecture & Sécurité (Backend Laravel)**

* Architecture en **API REST** (Séparation totale du Frontend React et du Backend Laravel).
* Authentification sécurisée par **Token** (via Laravel Sanctum).
* **Isolation de la validation** des données (utilisation de `Form Requests` séparés du contrôleur).
* Protection de la base de données contre l'assignation de masse (utilisation stricte du **`$fillable`** dans les modèles).
* **Hachage automatique** des mots de passe directement dans le modèle (méthode `casts()`).
* Gestion stricte des permissions via les **Policies**.
* Utilisation de **Seeders** pour générer des données de test proprement.

<img width="1316" height="404" alt="Capture d&#39;écran 2026-03-05 222624" src="https://github.com/user-attachments/assets/05f909bc-8e26-40f0-b3cf-6ca40921e014" />
<img width="1386" height="1041" alt="Capture d&#39;écran 2026-03-05 222448" src="https://github.com/user-attachments/assets/f064982e-04ee-4c37-9ae5-9ff99faab5d1" />
<img width="1421" height="1146" alt="Capture d&#39;écran 2026-03-05 223316" src="https://github.com/user-attachments/assets/d44de2ac-6147-4b64-9880-bc1d23296b9c" />
<img width="1851" height="1093" alt="Capture d&#39;écran 2026-03-05 222936" src="https://github.com/user-attachments/assets/e9b4dd11-e7e2-4c4f-8551-5577e243b824" />
<img width="1259" height="899" alt="Capture d&#39;écran 2026-03-05 222708" src="https://github.com/user-attachments/assets/bc35ebed-a8e6-4b03-ba10-b17aca890f0b" />

C'était un plaisir de travailler avec Renaud Baussart et Maxime Mortelec sur ce projet. 
