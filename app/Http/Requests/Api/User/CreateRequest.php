<?php

namespace App\Http\Requests\Api\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class CreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email'
        ];
    }


    public function messages()
    {
        return [
            
        ];
    }

    /**
     * custom ajax request
     * @param Validator $validator
     * @throws ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $json = [
            'success' => false,
            'errors' => $validator->errors(),
            'message' => ''
        ];
        $response = response( $json, 422 );
        throw (new ValidationException($validator, $response))->status(422);
    }
}
