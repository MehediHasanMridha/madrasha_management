/**
 * Rich Text Editor Components - Quick Usage Guide
 *
 * This file contains quick examples for using the RichTextEditor components
 * in your Laravel + React application.
 */

// ============================================================================
// BASIC IMPORTS
// ============================================================================

import { RichTextEditor, SimpleRichTextEditor } from '@/Components/UI';
// OR

// ============================================================================
// BASIC USAGE EXAMPLES
// ============================================================================

// 1. Simple Rich Text Editor (lightweight)
const BasicExample = () => {
    const [content, setContent] = useState('');

    return (
        <SimpleRichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Enter text..."
            height={250}
        />
    );
};

// 2. Full Rich Text Editor (all features)
const FullExample = () => {
    const [content, setContent] = useState('');

    return (
        <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Enter rich content..."
            height={400}
            config={{
                showCharsCounter: true,
                showWordsCounter: true
            }}
        />
    );
};

// ============================================================================
// FORM INTEGRATION EXAMPLES
// ============================================================================

// 3. Form with validation
const FormExample = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [errors, setErrors] = useState({});

    const handleContentChange = (content) => {
        setFormData(prev => ({ ...prev, content }));
        if (errors.content) {
            setErrors(prev => ({ ...prev, content: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.title) newErrors.title = 'Title required';
        if (!formData.content || formData.content === '<p><br></p>') {
            newErrors.content = 'Content required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Submit form...
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Title"
            />
            {errors.title && <span className="error">{errors.title}</span>}

            <RichTextEditor
                value={formData.content}
                onChange={handleContentChange}
                className={errors.content ? 'border-red-500' : ''}
            />
            {errors.content && <span className="error">{errors.content}</span>}

            <button type="submit">Submit</button>
        </form>
    );
};

// ============================================================================
// LARAVEL INTEGRATION EXAMPLES
// ============================================================================

// 4. Using with Laravel API
const LaravelIntegration = () => {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const saveContent = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({ content })
            });

            if (response.ok) {
                alert('Content saved!');
            }
        } catch (error) {
            console.error('Save failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <RichTextEditor
                value={content}
                onChange={setContent}
                config={{
                    uploader: {
                        url: '/api/upload-image',
                        format: 'json',
                        withCredentials: true,
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                        }
                    }
                }}
            />
            <button onClick={saveContent} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Content'}
            </button>
        </div>
    );
};

// ============================================================================
// CONFIGURATION EXAMPLES
// ============================================================================

// 5. Custom toolbar configuration
const CustomToolbar = () => {
    const [content, setContent] = useState('');

    return (
        <RichTextEditor
            value={content}
            onChange={setContent}
            config={{
                buttons: [
                    'bold', 'italic', 'underline', '|',
                    'ul', 'ol', '|',
                    'link', 'image', '|',
                    'undo', 'redo'
                ]
            }}
        />
    );
};

// 6. Read-only mode
const ReadOnlyExample = () => {
    const content = '<h2>This is read-only content</h2><p>Users cannot edit this.</p>';

    return (
        <RichTextEditor
            value={content}
            readOnly={true}
            height={200}
        />
    );
};

// 7. Dark theme
const DarkThemeExample = () => {
    const [content, setContent] = useState('');

    return (
        <RichTextEditor
            value={content}
            onChange={setContent}
            theme="dark"
        />
    );
};

// ============================================================================
// ADVANCED EXAMPLES
// ============================================================================

// 8. With image upload handling
const ImageUploadExample = () => {
    const [content, setContent] = useState('');

    return (
        <RichTextEditor
            value={content}
            onChange={setContent}
            config={{
                uploader: {
                    url: '/api/upload-image',
                    format: 'json',
                    imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'],
                    withCredentials: true,
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                    }
                },
                imageEditor: {
                    crop: true,
                    resize: true,
                    resizeUseRatio: true
                }
            }}
        />
    );
};

// 9. With content length validation
const ContentLengthExample = () => {
    const [content, setContent] = useState('');
    const [contentLength, setContentLength] = useState(0);
    const minLength = 100;

    const handleContentChange = (newContent) => {
        setContent(newContent);
        const textContent = newContent.replace(/<[^>]*>/g, '').trim();
        setContentLength(textContent.length);
    };

    return (
        <div>
            <RichTextEditor
                value={content}
                onChange={handleContentChange}
                className={contentLength < minLength ? 'border-red-500' : 'border-green-500'}
            />
            <div className="text-sm mt-2">
                Length: {contentLength}/{minLength} characters
                {contentLength < minLength && (
                    <span className="text-red-500 ml-2">
                        (Need {minLength - contentLength} more)
                    </span>
                )}
            </div>
        </div>
    );
};

// ============================================================================
// LARAVEL BLADE INTEGRATION
// ============================================================================

/*
In your Laravel Blade template:

<!DOCTYPE html>
<html>
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body>
    <div id="app"></div>
</body>
</html>

In your Laravel Controller:
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string'
        ]);

        // Save the rich text content
        // Note: Content is already HTML, so store it as-is
        $content = $request->input('content');

        // Save to database...

        return response()->json(['success' => true]);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'files.*' => 'required|image|max:2048'
        ]);

        $uploadedFiles = [];

        foreach ($request->file('files') as $file) {
            $path = $file->store('uploads', 'public');
            $uploadedFiles[] = [
                'url' => asset('storage/' . $path)
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $uploadedFiles
        ]);
    }
}
```

In your routes/web.php:
```php
Route::post('/api/content', [ContentController::class, 'store']);
Route::post('/api/upload-image', [ContentController::class, 'uploadImage']);
```
*/

export {
    BasicExample, ContentLengthExample, CustomToolbar, DarkThemeExample, FormExample, FullExample, ImageUploadExample, LaravelIntegration, ReadOnlyExample
};

