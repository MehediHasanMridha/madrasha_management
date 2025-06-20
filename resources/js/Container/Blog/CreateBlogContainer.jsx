import RichTextEditor from '@/Components/UI/RichTextEditor';
import StaticBtn from '@/Components/UI/StaticBtn';
import { router } from '@inertiajs/react';
import { Image, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateBlogContainer = ({ categories = [], existingTags = [] }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: '',
            content: '',
            excerpt: '',
            featured_image: null,
            tags: ['Education', 'Islamic'],
            status: 'published',
            blog_category_id: '',
            is_featured: false,
            allow_comments: true,
            meta_data: {
                meta_title: '',
                meta_description: '',
                meta_keywords: '',
            },
        },
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [newTag, setNewTag] = useState('');

    // Watch form values
    const watchedTags = watch('tags');
    const watchedTitle = watch('title');
    const watchedContent = watch('content');

    const handleRemoveTag = (tagToRemove) => {
        const currentTags = watchedTags.filter((tag) => tag !== tagToRemove);
        setValue('tags', currentTags);
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && newTag.trim()) {
            e.preventDefault();
            if (!watchedTags.includes(newTag.trim())) {
                setValue('tags', [...watchedTags, newTag.trim()]);
            }
            setNewTag('');
        }
    };

    const handleTagInputChange = (e) => {
        setNewTag(e.target.value);
    };

    const handleThumbnailUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnail(e.target.result);
            };
            reader.readAsDataURL(file);
            setValue('featured_image', file);
        }
    };

    const removeThumbnail = () => {
        setThumbnail(null);
        setValue('featured_image', null);
    };

    const onSubmit = (data) => {
        router.post(route('blogs.store'), data, {
            onSuccess: () => {
                reset();
                setThumbnail(null);
                setNewTag('');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
        });
    };

    const handleSaveDraft = () => {
        setValue('status', 'draft');
        handleSubmit(onSubmit)();
    };

    const handlePublish = () => {
        setValue('status', 'published');
        handleSubmit(onSubmit)();
    };

    return (
        <div className="min-h-screen px-12 py-8">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto flex max-w-7xl gap-6">
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between rounded-lg bg-white p-6">
                            <h1 className="text-2xl font-medium text-gray-900">Writing blog</h1>
                            <div className="flex gap-3">
                                <StaticBtn
                                    onClick={handleSaveDraft}
                                    disabled={isSubmitting}
                                    className="rounded-lg bg-gray-600 px-4 py-3 font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Draft'}
                                </StaticBtn>
                                <StaticBtn
                                    onClick={handlePublish}
                                    disabled={isSubmitting}
                                    className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Publishing...' : 'Publish'}
                                </StaticBtn>
                            </div>
                        </div>

                        {/* Title Section */}
                        <div className="space-y-3">
                            <label className="text-lg font-medium text-gray-700">Title</label>
                            <div className="rounded-lg bg-white p-6">
                                <input
                                    type="text"
                                    {...register('title', { required: 'Title is required' })}
                                    placeholder="Here is title field."
                                    className={`w-full border-none text-base text-gray-700 placeholder-gray-400 outline-none ${
                                        errors.title ? 'border-red-300' : ''
                                    }`}
                                />
                                {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
                            </div>
                        </div>

                        {/* Body Section */}
                        <div className="space-y-3">
                            <label className="text-lg font-medium text-gray-700">Content</label>
                            <div className="rounded-lg bg-white">
                                <RichTextEditor value={watchedContent} onChange={(content) => setValue('content', content)} />
                                {errors.content && <p className="mt-2 px-6 pb-4 text-sm text-red-600">{errors.content.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-96 space-y-6">
                        {/* Thumbnail Upload */}
                        <div className="rounded-lg bg-white p-4">
                            {!thumbnail ? (
                                <div className="space-y-6">
                                    <div className="flex h-56 w-full items-center justify-center rounded-lg bg-gray-200">
                                        <Image size={48} className="text-gray-400" />
                                    </div>
                                    <p className="text-sm text-gray-700">Please use JPEG format with non transparent background.</p>
                                    <div className="flex gap-4">
                                        <label className="flex-1">
                                            <input type="file" accept="image/jpeg,image/jpg" onChange={handleThumbnailUpload} className="hidden" />
                                            <div className="cursor-pointer rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700">
                                                Add Thumbnail
                                            </div>
                                        </label>
                                    </div>
                                    {errors.featured_image && <p className="text-sm text-red-600">{errors.featured_image}</p>}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="h-56 w-full overflow-hidden rounded-lg bg-gray-200">
                                        <img src={thumbnail} alt="Thumbnail" className="h-full w-full object-cover" />
                                    </div>
                                    <p className="text-sm text-gray-700">Please use JPEG format with non transparent background.</p>
                                    <div className="flex gap-4">
                                        <label className="flex-1">
                                            <input type="file" accept="image/jpeg,image/jpg" onChange={handleThumbnailUpload} className="hidden" />
                                            <div className="cursor-pointer rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700">
                                                Change Thumbnail
                                            </div>
                                        </label>
                                        <StaticBtn
                                            onClick={removeThumbnail}
                                            className="flex-1 rounded-lg bg-gray-100 px-4 py-3 font-medium text-red-600 transition-colors hover:bg-gray-200"
                                        >
                                            Remove
                                        </StaticBtn>
                                    </div>
                                    {errors.featured_image && <p className="text-sm text-red-600">{errors.featured_image}</p>}
                                </div>
                            )}
                        </div>

                        {/* Tags Section */}
                        <div className="rounded-lg bg-white p-4">
                            <h3 className="mb-6 text-lg font-medium text-gray-900">Add tags</h3>
                            <p className="mb-3 text-sm text-gray-700">Add relevant tags to help categorize your blog post.</p>
                            <div className="rounded-xl bg-gray-100 p-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    {watchedTags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-600"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="text-gray-400 transition-colors hover:text-gray-600"
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={handleTagInputChange}
                                        onKeyDown={handleAddTag}
                                        placeholder="Type and press Enter to add tag..."
                                        className="min-w-0 flex-1 border-none bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
                                        style={{ minWidth: '150px' }}
                                    />
                                </div>
                            </div>
                            {watchedTags.length === 0 && (
                                <p className="mt-2 text-xs text-gray-400">No tags added yet. Start typing to add your first tag.</p>
                            )}
                            {errors.tags && <p className="mt-2 text-sm text-red-600">{errors.tags}</p>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateBlogContainer;
