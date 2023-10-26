<?php

namespace App\Http\Requests\Api\Category;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class CreateRequest extends FormRequest
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
        if (!empty($this->category)) {

        } else {

        }
        return [
            'name' => 'required|string',
            'image' => 'nullable'
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

     /**
    * @param  \Illuminate\Validation\Validator  $validator
    * @return void
    */
    public function withValidator (Validator $validator)
    {
        $validator->after( function ($validator) {   
            if ($this->category) {
                if (!$this->checkIdExist()) {
                    // $this->mess = 'Thêm bản ghi lỗi, bản ghi không tồn tại';
                    // $validator->errors()->add('exception', 'Bản ghi lời không tồn tại');
                }
            }             
        });
    }

    private function checkIdExist () {
        $category = Category::find($this->category);

        if (empty($category)) {    
            return false;
        } else {
            return true;
        }
    }
}
