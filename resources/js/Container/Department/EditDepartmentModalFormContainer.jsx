import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const EditDepartmentModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { modal, setModal, passData } = useBoundStore((state) => state);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setFocus,
        setError,
        setValue,
    } = useForm();

    useEffect(() => {
        if (passData) {
            setValue('name', passData.name);
            setValue('description', passData.des);
            setValue('icon', passData.img);
        }
    }, [passData, setValue]);

    const handleCancel = () => {
        setModal({ edit: false });
        reset();
    };

    const onSubmit = (data) => {
        router.post(route('department.update', passData.slug), data, {
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
            title="Edit Department"
            footer={() => (
                <SubmitBtn
                    loadingIndicator={isLoading}
                    btnText={'Update Department'}
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <form className="max-h-[70vh] overflow-y-scroll">
                <FieldSet label={'Department Information'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field error={errors.name} label={'Department Name'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Department Name"
                            {...register('name', { required: 'Department Name is required' })}
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
                    <Field error={errors.icon} label={'Icon'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Icon URL"
                            {...register('icon', { required: 'Icon URL is required' })}
                        />
                    </Field>
                </FieldSet>
            </form>
        </ModalUI>
    );
};

export default EditDepartmentModalFormContainer;
