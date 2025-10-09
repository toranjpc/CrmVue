<?php

namespace Modules\User\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize()
    {
        return true; // یا شرط خاصی بذار
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|min:11|max:11|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'نام و نام خانوادگی الزامی است.',
            'name.max' => 'نام و نام خانوادگی نباید بیشتر از 255 کاراکتر باشد.',
            'mobile.required' => 'شماره موبایل الزامی است.',
            'mobile.min' => 'شماره موبایل باید 11 رقم باشد.',
            'mobile.max' => 'شماره موبایل باید 11 رقم باشد.',
            'mobile.unique' => 'این شماره موبایل قبلاً ثبت شده است.',
            'password.required' => 'رمز عبور الزامی است.',
            'password.min' => 'رمز عبور باید حداقل 8 کاراکتر باشد.',
            'password.confirmed' => 'تکرار رمز عبور با رمز عبور مطابقت ندارد.',
        ];
    }
}
