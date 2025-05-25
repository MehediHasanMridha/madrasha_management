import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useDepartmentStore } from '@/stores';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const EditClassModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { modal, setModal } = useDepartmentStore((state) => state);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        setFocus,
        setError,
        setValue,
    } = useForm();

    if (modal.edit && modal.data) {
        setValue('name', modal.data.name);
        setValue('boarding_fee', modal?.data?.fee_types?.find((fee) => fee.name === 'Boarding Fee')?.amount);
        setValue('academic_fee', modal?.data?.fee_types?.find((fee) => fee.name === 'Academic Fee')?.amount);
        setValue('admission_fee', modal?.data?.fee_types?.find((fee) => fee.name === 'Admission Fee')?.amount);
    }

    const handleCancel = () => {
        setModal({ edit: false });
        reset();
    };

    const onSubmit = (data) => {
        router.put(
            route('class.update', { class_slug: modal.data?.slug }),
            {
                ...data,
            },
            {
                onStart: () => {
                    setIsLoading(true);
                },
                onSuccess: (res) => {
                    if (res.props?.flash?.error) {
                        notification.error({
                            message: 'Error',
                            description: res.props?.flash?.error,
                            placement: 'bottomRight',
                        });
                    }
                    if (res.props?.flash?.success) {
                        notification.success({
                            message: 'Success',
                            description: res.props?.flash?.success,
                            placement: 'bottomRight',
                        });
                    }
                    reset();
                    setModal({ edit: false });
                    setIsLoading(false);
                },
                onError: (errors) => {
                    Object.keys(errors).forEach((field) => {
                        if (field !== 'message') {
                            setError(field, {
                                type: 'manual',
                                message: errors[field],
                            });
                            if (field === Object.keys(errors)[0]) {
                                setFocus(field);
                            }
                        }
                    });
                    setIsLoading(false);
                },
            },
        );
    };

    return (
        <ModalUI
            isModalOpen={modal.edit}
            handleCancel={handleCancel}
            width={'50%'}
            title="Edit Class"
            style={{ top: 0 }}
            footer={() => (
                <SubmitBtn
                    loadingIndicator={isLoading}
                    btnText={'Update Class'}
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <div className="space-y-4">
                <FieldSet label={'Class Information'} labelClassName="text-[16px] font-bold" className="md:grid-cols-1" hr={true}>
                    <Field error={errors.name} label={'Class Name'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Class Name"
                            {...register('name', { required: 'Class Name is required' })}
                        />
                    </Field>
                </FieldSet>
                <FieldSet label={'Monthly Fee'} labelClassName="text-[18px] font-[400]" className="flex justify-between gap-4">
                    <Field error={errors.boarding_fee} label={'Boarding fee'} className="flex-1">
                        <input
                            type="number"
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="3,000 BDT"
                            {...register('boarding_fee', {
                                required: 'Boarding fee is required',
                                valueAsNumber: true,
                                validate: (value) => value >= 0 || 'Boarding fee cannot be negative',
                                pattern: {
                                    value: /^\d+$/,
                                    message: 'Boarding fee must be a valid number',
                                },
                            })}
                            min={0}
                        />
                    </Field>
                    <Field error={errors.academic_fee} label={'Academic fee'} className="flex-1">
                        <input
                            type="number"
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="3,000 BDT"
                            {...register('academic_fee', {
                                required: 'Academic fee is required',
                                valueAsNumber: true,
                                validate: (value) => value >= 0 || 'Academic fee cannot be negative',
                                pattern: {
                                    value: /^\d+$/,
                                    message: 'Academic fee must be a valid number',
                                },
                            })}
                            min={0}
                        />
                    </Field>
                </FieldSet>

                <Field error={errors.admission_fee} label={'Session fee'}>
                    <input
                        type="number"
                        className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                        placeholder="00 BDT"
                        {...register('admission_fee', {
                            required: 'Session fee is required',
                            valueAsNumber: true,
                            validate: (value) => value >= 0 || 'Session fee cannot be negative',
                            pattern: {
                                value: /^\d+$/,
                                message: 'Session fee must be a valid number',
                            },
                        })}
                        min={0}
                    />
                </Field>
            </div>
        </ModalUI>
    );
};

export default EditClassModalFormContainer;
