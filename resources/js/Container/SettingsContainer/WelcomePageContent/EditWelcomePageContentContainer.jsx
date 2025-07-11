import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import WelcomeContentRenderDataFieldsContainer from './WelcomeContentRenderDataFieldsContainer';

const EditWelcomePageContentContainer = ({ isModalOpen, onClose, initialData = null, title = 'Edit Content' }) => {
    // loading state for the form
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
        if (initialData) {
            reset({
                section_key: initialData.section_key || '',
                title: initialData.title || '',
                content: initialData.content || '',
                data: initialData.data || {},
                is_active: initialData.is_active !== undefined ? initialData.is_active : true,
            });
        }
    }, [initialData, isModalOpen, reset]);

    const handleDataChange = (key, value) => {
        const currentData = watch('data') || {};
        setValue('data', {
            ...currentData,
            [key]: value,
        });
    };

    const onSubmit = (updatedContent) => {
        router.put(route('settings.welcome-page.update', { welcomePageContent: initialData?.id }), updatedContent, {
            preserveScroll: true,
            onStart: () => setLoading(true),
            onSuccess: (response) => {
                if (response.props.flash?.success) {
                    notification.success({
                        message: 'Success',
                        description: response.props.flash.success,
                        placement: 'bottomRight',
                    });
                }
                if (response.props.flash?.error) {
                    notification.error({
                        message: 'Error',
                        description: response.props.flash.error,
                        placement: 'bottomRight',
                    });
                }
            },
            onFinish: () => {
                onClose();
                setLoading(false);
                reset({
                    section_key: '',
                    title: '',
                    content: '',
                    data: {},
                    is_active: true,
                });
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
                    btnText="Update Content"
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <form className="max-h-[70vh] overflow-y-scroll">
                <FieldSet label={'Basic Information'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field label={'Section Key'} error={errors.section_key}>
                        <>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="e.g., hero, notice, stats"
                                {...register('section_key', {
                                    required: 'Section key is required',
                                    pattern: {
                                        value: /^[a-z0-9_-]+$/,
                                        message: 'Section key can only contain lowercase letters, numbers, hyphens, and underscores',
                                    },
                                })}
                                disabled
                            />
                            <div className="mt-1 text-xs text-blue-500">Section key cannot be changed when editing</div>
                        </>
                    </Field>

                    <Field label={'Title'} error={errors.title}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Title"
                            {...register('title')}
                        />
                    </Field>

                    <Field label={'Content'} className="md:col-span-2" error={errors.content}>
                        <textarea
                            rows={4}
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Content"
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

                {/* Section-specific data fields */}
                <WelcomeContentRenderDataFieldsContainer
                    sectionKey={sectionKey}
                    handleDataChange={handleDataChange}
                    watch={watch}
                    setValue={setValue}
                />
            </form>
        </ModalUI>
    );
};

export default EditWelcomePageContentContainer;
