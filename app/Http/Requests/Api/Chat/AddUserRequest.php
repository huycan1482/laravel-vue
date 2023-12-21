<?php

namespace App\Http\Requests\Api\Chat;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class AddUserRequest extends FormRequest
{
    /**
     * Determine if the category is authorized to make this request.
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
        // if (!empty($this->message)) {

        // } else {
            
        // }

        return [
            'user_id' => 'required|exists:users,id',
            'chat_id' => 'required|exists:chats,id',
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
            'message' => 'Validate Error'
        ];
        $response = response( $json, 422 );
        throw (new ValidationException($validator, $response))->status(422);
    }

     /**
    * @param  \Illuminate\Validation\Validator  $validator
    * @return void
    */
    public function withValidator (Validator $validator)
    {
        $validator->after( function ($validator) {   
       
        });
    }

}
