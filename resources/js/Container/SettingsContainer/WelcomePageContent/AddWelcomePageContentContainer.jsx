import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import WelcomeContentRenderDataFieldsContainer from './WelcomeContentRenderDataFieldsContainer';

const AddWelcomePageContentContainer = ({ isModalOpen, onClose, defaultSections = [], title = 'Add New Section' }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            section_key: '',
            title: '',
            content: '',
            data: {},
            is_active: true,
        },
    });

    const sectionKey = useWatch({ control, name: 'section_key' });

    useEffect(() => {
        // Reset form when modal opens
        if (isModalOpen) {
            reset({
                section_key: '',
                title: '',
                content: '',
                data: {},
                is_active: true,
            });
            setSelectedTemplate('');
        }
    }, [isModalOpen, reset]);

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template.section_key);
        reset({
            section_key: template.section_key,
            title: template.title,
            content: template.content,
            data: template.data,
            is_active: true,
        });
    };

    const handleDataChange = (key, value) => {
        const currentData = watch('data') || {};
        setValue('data', {
            ...currentData,
            [key]: value,
        });
    };

    const onSubmit = (newContent) => {
        router.post(route('settings.welcome-page.store'), newContent, {
            preserveScroll: true,
            onStart: () => setLoading(true),
            onSuccess: (page) => {
                if (page.props.flash?.success) {
                    notification.success({
                        message: 'Success',
                        description: page.props.flash.success,
                        placement: 'bottomRight',
                    });
                }
                if (page.props.flash?.error) {
                    notification.error({
                        message: 'Error',
                        description: page.props.flash.error,
                        placement: 'bottomRight',
                    });
                }
            },
            onFinish: () => {
                setSelectedTemplate('');
                reset({
                    section_key: '',
                    title: '',
                    content: '',
                    data: {},
                    is_active: true,
                });
                setLoading(false);
                onClose();
            },
        });
    };

    return (
        <ModalUI
            isModalOpen={isModalOpen}
            handleCancel={onClose}
            width={'80%'}
            title={title}
            footer={() => (
                <SubmitBtn
                    loadingIndicator={loading}
                    btnText="Create Section"
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <form className="max-h-[70vh] overflow-y-auto">
                <FieldSet label={'Basic Information'} labelClassName="text-[16px] font-bold" hr={true}>
                    {/* Template Selection - Prominent for new content */}
                    {defaultSections.length > 0 && (
                        <Field label={'Choose a template'} className="md:col-span-2">
                            <>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {defaultSections.map((template) => (
                                        <button
                                            key={template.section_key}
                                            type="button"
                                            onClick={() => handleTemplateSelect(template)}
                                            className={`rounded-[8px] border-2 p-4 text-left text-sm transition-all hover:shadow-md ${
                                                selectedTemplate === template.section_key
                                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                                    : 'border-[#AFAFAF] hover:border-blue-300'
                                            }`}
                                        >
                                            <div className="font-semibold text-gray-800">{template.title}</div>
                                            <div className="mt-1 text-xs text-gray-500">{template.section_key}</div>
                                            <div className="mt-2 line-clamp-2 text-xs text-gray-600">
                                                {template.content || 'Pre-configured section template'}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                    Select a template to get started quickly, or create your own custom section below.
                                </div>
                            </>
                        </Field>
                    )}

                    <Field label={'Section Key'} error={errors.section_key}>
                        <>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="e.g., hero, notice, stats, curriculum, about"
                                {...register('section_key', {
                                    required: 'Section key is required',
                                    pattern: {
                                        value: /^[a-z0-9_-]+$/,
                                        message: 'Section key can only contain lowercase letters, numbers, hyphens, and underscores',
                                    },
                                })}
                            />
                            <div className="mt-1 text-xs text-gray-500">Unique identifier for this section (lowercase, no spaces)</div>
                        </>
                    </Field>

                    <Field label={'Title'} error={errors.title}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Section Title"
                            {...register('title')}
                        />
                    </Field>

                    <Field label={'Content'} className="md:col-span-2" error={errors.content}>
                        <textarea
                            rows={4}
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter section content or description"
                            {...register('content')}
                        />
                    </Field>

                    <Field label={'Status'}>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_active"
                                {...register('is_active')}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="is_active" className="ml-2 text-sm text-gray-900">
                                Active (visible on welcome page)
                            </label>
                        </div>
                    </Field>
                </FieldSet>

                <WelcomeContentRenderDataFieldsContainer sectionKey={selectedTemplate} handleDataChange={handleDataChange} watch={watch} />
            </form>
        </ModalUI>
    );
};

export default AddWelcomePageContentContainer;
