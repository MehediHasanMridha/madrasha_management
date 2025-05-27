import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useDepartmentStore } from '@/stores';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const EditClassModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { modal, setModal } = useDepartmentStore((state) => state);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setFocus,
        setError,
        setValue,
        reset,
    } = useForm();

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: 'subjects',
    });

    useEffect(() => {
        if (modal.edit && modal.data) {
            setValue('name', modal.data.name);
            setValue('boarding_fee', modal?.data?.fee_types?.find((fee) => fee.name === 'Boarding Fee')?.amount);
            setValue('academic_fee', modal?.data?.fee_types?.find((fee) => fee.name === 'Academic Fee')?.amount);
            setValue('admission_fee', modal?.data?.fee_types?.find((fee) => fee.name === 'Admission Fee')?.amount);
            setValue('slug', modal.data.slug);

            // Set subjects data
            if (modal.data.subjects && modal.data.subjects.length > 0) {
                const subjectsData = modal.data.subjects.map((subject) => ({
                    name: subject.name,
                    code: subject.code || '',
                }));
                replace(subjectsData);
            } else {
                replace([]);
            }
        }
    }, [modal.edit, modal.data, setValue, replace]);

    const handleCancel = () => {
        setModal({ edit: false, data: null });
    };

    const onSubmit = (data) => {
        setValue('name', data.name);
        setValue('boarding_fee', data.boarding_fee);
        setValue('academic_fee', data.academic_fee);
        setValue('admission_fee', data.admission_fee);
        setModal({ data: null });
        router.put(
            route('class.update', { class_slug: data.slug }),
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
                onFinish: () => {
                    setIsLoading(false);
                    setModal({ edit: false });
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

                {/* Add Subject Section */}
                <FieldSet label={'Add subject'} labelClassName="text-[18px] font-[400]" className="md:grid-cols-1" hr={true}>
                    {fields.length > 0 && (
                        <div className="max-h-[200px] overflow-hidden overflow-y-auto rounded-[4px] border border-[#AFAFAF]">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 bg-[#F2F2F2]">
                                <div className="col-span-5 border-r border-b-[0.5px] border-[#AFAFAF] px-4 py-4">
                                    <span className="block text-center text-[14px] font-[400] text-[#131313]">Subject</span>
                                </div>
                                <div className="col-span-5 border-r border-b-[0.5px] border-[#AFAFAF] px-4 py-4">
                                    <span className="block text-center text-[14px] font-[400] text-[#131313]">Subject Code</span>
                                </div>
                                <div className="col-span-2 border-b-[0.5px] px-4 py-4">
                                    <span className="block text-center text-[14px] font-[400] text-[#131313]">Action</span>
                                </div>
                            </div>

                            {/* Table Rows */}
                            {fields.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-12 border-b-[0.5px] border-[#AFAFAF] last:border-b-0">
                                    <div className="col-span-5 border-r-[0.5px] border-[#AFAFAF] px-4 py-4">
                                        <input
                                            type="text"
                                            className="w-full bg-transparent text-[14px] font-[400] text-[#4A4A4A] focus:outline-none"
                                            placeholder="Enter subject name"
                                            {...register(`subjects.${index}.name`, { required: 'Subject name is required' })}
                                        />
                                        {errors.subjects?.[index]?.name && (
                                            <span className="mt-1 block text-xs text-red-500">{errors.subjects[index].name.message}</span>
                                        )}
                                    </div>
                                    <div className="col-span-5 border-r-[0.5px] border-[#AFAFAF] px-4 py-4">
                                        <input
                                            type="text"
                                            className="w-full bg-transparent text-[14px] font-[400] text-[#4A4A4A] focus:outline-none"
                                            placeholder="Enter subject code (optional)"
                                            {...register(`subjects.${index}.code`)}
                                        />
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center px-4 py-4">
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="cursor-pointer rounded-lg p-[6px] text-gray-400 hover:bg-gray-200 hover:text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add New Button */}
                    <div className="mt-4 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => append({ name: '', code: '' })}
                            className="flex cursor-pointer items-center gap-2 text-[#0267FF] transition-colors hover:text-blue-700"
                        >
                            <Plus className="h-4 w-4 border-[2px] border-[#0267FF]" />
                            <span className="text-[14px] font-[500]">Add new</span>
                        </button>
                    </div>
                </FieldSet>
            </div>
        </ModalUI>
    );
};

export default EditClassModalFormContainer;
