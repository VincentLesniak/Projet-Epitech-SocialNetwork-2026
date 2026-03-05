<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Le prénom et le nom sont obligatoires et limités à 30 caractères max dans la BDD 
            'first_name' => 'required|string|max:30',
            'last_name'  => 'required|string|max:30',

            // On précise à Laravel de vérifier l'unicité sur la table 'users', colonne 'mail'
            'mail'       => 'required|string|email|max:50|unique:users,mail',
            //unique:users,mail signifie que l'email doit être unique dans la table users, colonne mail

            // La date de naissance est obligatoire et doit être au format date
            'birthdate'  => 'required|date',

            // Le mot de passe (on créer une règle de 8 caractères minimum)
            'password'   => 'required|string|min:8|confirmed',
        ];
    }
}
