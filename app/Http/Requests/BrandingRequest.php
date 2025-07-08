<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BrandingRequest extends FormRequest
{
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
            'institute_name'        => 'sometimes|string|max:255',
            'institute_name_bangla' => 'sometimes|string|max:255',
            'logo'                  => 'sometimes|nullable|file|image|max:2048',
            // 'favicon'               => 'sometimes|nullable|file|image|max:1024|dimensions:max_width=64,max_height=64',
            'favicon'               => 'sometimes|nullable|file|image|max:1024',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'logo.max'             => 'Logo file size should not exceed 2MB.',
            'logo.dimensions'      => 'Logo dimensions should not exceed 300x80 pixels.',
            'favicon.max'          => 'Favicon file size should not exceed 1MB.',
            'favicon.dimensions'   => 'Favicon dimensions should not exceed 64x64 pixels.',
            'login_page_image.max' => 'Login page image should not exceed 5MB.',
        ];
    }
}
