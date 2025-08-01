import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useDepartmentStore } from '@/stores';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const EditDepartmentModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { modal, setModal } = useDepartmentStore((state) => state);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setFocus,
        setError,
        setValue,
    } = useForm();

    if (modal?.data) {
        setValue('name', modal.data.name);
        setValue('description', modal?.data?.des);
    }
    const handleCancel = () => {
        setModal({ edit: false });
        reset();
    };

    const onSubmit = (data) => {
        router.post(route('department.update', modal?.data?.slug), data, {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: (res) => {
                if (res.props.flash.error) {
                    notification.error({
                        message: 'Error',
                        description: res.props.flash.error,
                        placement: 'bottomRight',
                    });
                }
                if (res.props.flash.success) {
                    notification.success({
                        message: 'Success',
                        description: res.props.flash.success,
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
        });
    };

    return (
        <ModalUI
            isModalOpen={modal.edit}
            handleCancel={handleCancel}
            width={'80%'}
            title="Edit Campus"
            footer={() => (
                <SubmitBtn
                    loadingIndicator={isLoading}
                    btnText={'Update Campus'}
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <FieldSet className="md:grid-cols-1" label={'Campus Information'} labelClassName="text-[16px] font-bold" hr={true}>
                <Field error={errors.name} label={'Campus Name'}>
                    <input
                        type="text"
                        className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                        placeholder="Enter Campus Name"
                        {...register('name', { required: 'Campus Name is required' })}
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
        </ModalUI>
    );
};

export default EditDepartmentModalFormContainer;
