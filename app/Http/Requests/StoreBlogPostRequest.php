<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreBlogPostRequest extends FormRequest
{/**
 * Determine if the user is authorized to make this request.
 */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'                      => 'required|string|max:255',
            'slug'                       => 'nullable|string|max:255|unique:blog_posts,slug',
            'excerpt'                    => 'nullable|string|max:500',
            'content'                    => 'required|string',
            'featured_image'             => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'gallery_images.*'           => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status'                     => 'nullable|in:draft,published,scheduled',
            'published_at'               => 'nullable|date|after_or_equal:now',
            'blog_category_id'           => 'nullable|exists:blog_categories,id',
            'tags'                       => 'nullable|array',
            'tags.*'                     => 'string|max:50',
            'is_featured'                => 'nullable|boolean',
            'allow_comments'             => 'nullable|boolean',
            'meta_data'                  => 'nullable|array',
            'meta_data.meta_title'       => 'nullable|string|max:60',
            'meta_data.meta_description' => 'nullable|string|max:160',
            'meta_data.meta_keywords'    => 'nullable|string|max:255',
        ];
    }/**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required'          => 'The blog title is required.',
            'title.max'               => 'The blog title may not be greater than 255 characters.',
            'content.required'        => 'The blog content is required.',
            'featured_image.image'    => 'The featured image must be an image file.',
            'featured_image.mimes'    => 'The featured image must be a file of type: jpeg, png, jpg, gif.',
            'featured_image.max'      => 'The featured image may not be greater than 2MB.',
            'gallery_images.*.image'  => 'Each gallery image must be an image file.',
            'gallery_images.*.mimes'  => 'Each gallery image must be a file of type: jpeg, png, jpg, gif.',
            'gallery_images.*.max'    => 'Each gallery image may not be greater than 2MB.',
            'blog_category_id.exists' => 'The selected category is invalid.',
            'tags.*.max'              => 'Each tag may not be greater than 50 characters.',
        ];
    }
}
