<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email,' . $this->route('client'),
            'address' => 'required|string|max:255',
            'contact_number' => 'required|string|max:15',
            'date_of_birth' => 'required|date',
            'source_of_income' => 'required|string|max:255',
        ];

        if ($this->filled('password')) {
            $rules['password'] = 'string|confirmed|min:8';
        }

        return $rules;
    }
}
