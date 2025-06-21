import Field from '@/Components/UI/Field';
import FileUploadField from '@/Components/UI/FileUploadField';
import StaticBtn from '@/Components/UI/StaticBtn';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { Upload } from 'antd';
import JoditEditor from 'jodit-react';
import { X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
const { Dragger } = Upload;
const CreateBlogContainer = ({ categories = [], existingTags = [] }) => {
    const editor = useRef(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            tags: existingTags || [],
        },
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [newTag, setNewTag] = useState('');

    // Watch form values
    const watchedTags = watch('tags');

    const handleRemoveTag = (tagToRemove) => {
        const currentTags = watchedTags.filter((tag) => tag !== tagToRemove);
        setValue('tags', currentTags);
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && newTag.trim()) {
            e.preventDefault();
            if (!watchedTags?.includes(newTag.trim())) {
                setValue('tags', [...watchedTags, newTag.trim()]);
            }
            setNewTag('');
        }
    };

    const handleTagInputChange = (e) => {
        setNewTag(e.target.value);
    };

    const onSubmit = (data) => {
        router.post(
            route('blogs.store'),
            {
                ...data,
                content: data.body, // Rename body to content for consistency
                featured_image: data.featured_image ? data.featured_image?.file : null, // Handle file upload
            },
            {
                onSuccess: () => {
                    reset();
                    setNewTag('');
                },
                onError: (errors) => {
                    console.error('Validation errors:', errors);
                },
            },
        );
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
        <div className="h-full py-8">
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
                    <Field labelClassName={'text-gray-700 font-medium text-xl'} label={'Title'} error={errors.title} className="space-y-3">
                        <input
                            type="text"
                            {...register('title', { required: 'Title is required' })}
                            placeholder="Here is title field."
                            className={cn(
                                'w-full rounded-lg border-1 border-gray-400 bg-white p-3 text-base text-gray-700 placeholder-gray-400 focus:outline-none',
                                errors.title ? 'border-red-300' : '',
                            )}
                        />
                    </Field>

                    <Field className="space-y-3" error={errors.body} label="Body" labelClassName={'text-gray-700 font-medium text-xl'}>
                        <Controller
                            name="body"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Content is required',
                                minLength: { value: 100, message: 'Content must be at least 100 characters' },
                            }}
                            render={({ field }) => (
                                <JoditEditor
                                    className="h-[500px]"
                                    ref={editor}
                                    value={field.value}
                                    onBlur={field.onChange}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </Field>
                </div>

                <div className="w-96 space-y-6">
                    <Field
                        className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4"
                        error={errors.featured_image}
                        label="Featured Image"
                        labelClassName={'text-gray-700 font-medium text-xl'}
                    >
                        <Controller
                            name="featured_image"
                            control={control}
                            defaultValue={null}
                            rules={{
                                required: 'Featured image is required',
                            }}
                            render={({ field: { onChange, value, ref } }) => (
                                <FileUploadField.DragAndDrop
                                    control={control}
                                    text="Upload Image"
                                    className="h-60 w-full"
                                    onChange={onChange}
                                    ref={ref}
                                />
                            )}
                        />
                    </Field>

                    <Field className="space-y-3" error={errors.tags} label="Tags" labelClassName={'text-gray-700 font-medium text-xl'}>
                        <div className="rounded-lg bg-white p-4">
                            <h3 className="mb-6 text-lg font-medium text-gray-900">Add tags</h3>
                            <p className="mb-3 text-sm text-gray-700">Add relevant tags to help categorize your blog post.</p>
                            <div className="rounded-xl bg-gray-100 p-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    {watchedTags?.map((tag, index) => (
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
                            {watchedTags?.length === 0 && (
                                <p className="mt-2 text-xs text-gray-400">No tags added yet. Start typing to add your first tag.</p>
                            )}
                        </div>
                    </Field>
                </div>
            </div>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
            </form> */}
        </div>
    );
};

export default CreateBlogContainer;
