import Field from '@/Components/UI/Field';
import FileUploadField from '@/Components/UI/FileUploadField';
import StaticBtn from '@/Components/UI/StaticBtn';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
const BrandingContainer = ({ settings }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isDirty },
        reset,
    } = useForm({
        defaultValues: {
            institute_name: settings.institute_name || '',
            institute_name_bangla: settings.institute_name_bangla || '',
        },
    });

    // Handle form submission (for Save button)
    const onSubmit = (data) => {
        router.post(
            route('settings.branding.update'),
            {
                ...data,
                logo: data.logo?.file || null, // Ensure logo is sent as file if exists
                favicon: data.favicon?.file || null, // Ensure favicon is sent as file if exists
            },
            {
                preserveScroll: true,
                onStart: () => {
                    setIsSubmitting(true);
                },
                onSuccess: (response) => {
                    reset(data);
                    if (response.props.flash?.success) {
                        notification.success({
                            message: 'Success',
                            description: response.props.flash.success,
                            placement: 'bottomRight',
                        });
                    }
                },
                onError: (errors) => {
                    console.error('Submit errors:', errors);
                    notification.error({
                        message: 'Error',
                        description: 'Failed to save settings. Please try again.',
                        placement: 'bottomRight',
                    });
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            },
        );
    };

    return (
        <>
            <div className="flex w-full items-center justify-between">
                <span className="text-2xl font-bold">Branding</span>
                <StaticBtn onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                </StaticBtn>
            </div>
            <div className="mt-5 space-y-5">
                {/* Institute English Name Section */}
                <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white">
                    <Field
                        label={'Institute English Name'}
                        className="w-full px-6 py-4"
                        labelClassName={'text-base font-medium text-gray-700'}
                        error={errors.institute_name}
                    >
                        <input
                            {...register('institute_name', {
                                required: 'Institute name is required',
                            })}
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:border-blue-500 focus:outline-0"
                            placeholder="Enter institute name in English"
                        />
                    </Field>
                </div>

                {/* Institute Bangla Name Section */}
                <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white">
                    <Field
                        label={'Institute Bangla Name'}
                        className="w-full px-6 py-4"
                        labelClassName={'text-base font-medium text-gray-700'}
                        error={errors.institute_name_bangla}
                    >
                        <input
                            {...register('institute_name_bangla', {
                                required: 'Institute name in Bangla is required',
                            })}
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:border-blue-500 focus:outline-0"
                            placeholder="প্রতিষ্ঠানের নাম বাংলায় লিখুন"
                        />
                    </Field>
                </div>

                {/* Institute Logo Section */}
                <div className="w-full items-center justify-start rounded-lg bg-white">
                    <Field
                        label={'Institute Logo'}
                        className="w-fit px-6 py-4"
                        labelClassName={'text-base font-medium text-gray-700'}
                        error={errors.logo}
                    >
                        <div className="flex items-center gap-x-4">
                            <Controller
                                control={control}
                                name="logo"
                                render={({ field }) => {
                                    return <FileUploadField.DragAndDrop {...field} className={'h-56 w-72'} text={'Upload Logo'} />;
                                }}
                            />
                            {settings.logo_path && (
                                <div className="flex items-center justify-center">
                                    <img src={`/${settings.logo_path}`} alt="Current Logo" className="h-56 w-72 rounded border object-cover" />
                                </div>
                            )}
                        </div>
                    </Field>
                </div>

                {/* Favicon Section */}
                <div className="flex w-full max-w-[1520px] flex-col items-center justify-center rounded-lg bg-white">
                    <Field
                        className="w-full px-6 py-4"
                        labelClassName={'text-base font-medium text-gray-700'}
                        label={'Favicon'}
                        error={errors.favicon}
                    >
                        <div className="flex items-center gap-x-4">
                            <Controller
                                name="favicon"
                                control={control}
                                render={({ field }) => (
                                    <FileUploadField control={control} ref={field.ref} onChange={field.onChange} text={'Upload Favicon'} />
                                )}
                            />
                            {settings.favicon_path && (
                                <div className="flex items-center justify-center">
                                    <img src={`/${settings.favicon_path}`} alt="Current Favicon" className="h-16 w-16 rounded border object-cover" />
                                </div>
                            )}
                            <p className="text-sm text-gray-500">Max size: 1MB, Max dimensions: 64x64px</p>
                        </div>
                    </Field>
                </div>
            </div>
        </>
    );
};

export default BrandingContainer;
