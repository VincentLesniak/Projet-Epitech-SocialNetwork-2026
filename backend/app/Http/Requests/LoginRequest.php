<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true; // everyone can try to connect
    }

    public function rules(): array {
        return [
            'mail'     => 'required|email',
            'password' => 'required|string',
        ];
    }
}
