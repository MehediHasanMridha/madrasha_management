import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useDepartmentStore } from '@/stores';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddDepartmentModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { modal, setModal } = useDepartmentStore((state) => state);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setFocus,
        setError,
    } = useForm();

    const handleCancel = () => {
        setModal({ add: false });
        reset();
    };

    const onSubmit = (data) => {
        router.post(route('department.store'), data, {
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
                setModal({ add: false });
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
            isModalOpen={modal.add}
            handleCancel={handleCancel}
            width={'80%'}
            title="Add Campus"
            footer={() => (
                <SubmitBtn
                    loadingIndicator={isLoading}
                    btnText={'Add Campus'}
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <FieldSet label={'Campus Information'} className="md:grid-cols-1" labelClassName="text-[16px] font-bold" hr={true}>
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

export default AddDepartmentModalFormContainer;
