import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const EditClassModalFormContainer = ({ departments }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { modal, setModal, passData } = useBoundStore((state) => state);

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

    useEffect(() => {
        if (passData) {
            setValue('name', passData.name);
            setValue('department', passData.department_id);
            setValue('icon', passData.img);
            setValue('description', passData.des);
        }
    }, [passData, setValue]);

    const handleCancel = () => {
        setModal({ edit: false });
        reset();
    };

    const onSubmit = (data) => {
        router.post(route('class.update', passData.slug), data, {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: () => {
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
        });
    };

    return (
        <ModalUI
            isModalOpen={modal.edit}
            handleCancel={handleCancel}
            width={'80%'}
            title="Edit Class"
            footer={() => (
                <SubmitBtn
                    loadingIndicator={isLoading}
                    btnText={'Update Class'}
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <form className="max-h-[70vh] overflow-y-scroll">
                <FieldSet label={'Class Information'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field error={errors.name} label={'Class Name'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Class Name"
                            {...register('name', { required: 'Class Name is required' })}
                        />
                    </Field>
                    <Field error={errors.department} label={'Department'}>
                        <select
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            {...register('department', { required: 'Department is required' })}
                        >
                            <option value="">Select Department</option>
                            {departments?.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field error={errors.icon} label={'Class Icon URL'}>
                        <input
                            type="text"
                            name="icon"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Class Icon URL"
                            {...register('icon')}
                        />
                    </Field>
                    <Field label={'Description'}>
                        <textarea
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Description"
                            {...register('description')}
                            rows={4}
                        />
                    </Field>
                </FieldSet>
            </form>
        </ModalUI>
    );
};

export default EditClassModalFormContainer;
