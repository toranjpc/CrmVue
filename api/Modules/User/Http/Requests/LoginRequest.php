<?php

namespace Modules\User\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'username' => 'required|string',
            'password' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'username.required' => 'وارد کردن نام کاربری / شماره موبایل الزامی است.',
            'password.required' => 'وارد کردن رمز عبور الزامی است.',
        ];
    }
}
