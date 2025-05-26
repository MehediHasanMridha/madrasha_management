import Field from '@/Components/UI/Field';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const EditFeeCategoryModalFormContainer = ({ editFeeModal, setEditFeeModal, data: passedData }) => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setFocus,
        setError,
        setValue,
    } = useForm();

    if (passedData) {
        setValue('name', passedData.name);
    }

    const handleCancel = () => {
        setEditFeeModal(false);
        reset();
    };

    const onSubmit = (data) => {
        router.put(route('fee_update_category', { category: passedData.id }), data, {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: (res) => {
                if (res.props.flash.success) {
                    notification.success({
                        message: 'Success',
                        description: res.props.flash.success,
                        placement: 'bottomRight',
                    });
                }
                if (res.props.flash.error) {
                    notification.error({
                        message: 'Error',
                        description: res.props.flash.error,
                        placement: 'bottomRight',
                    });
                }
                reset();
                setEditFeeModal(false);
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
            isModalOpen={editFeeModal}
            handleCancel={handleCancel}
            title="Edit Fee Type"
            footer={() => (
                <SubmitBtn
                    loadingIndicator={isLoading}
                    btnText={'Update Fee Type'}
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <div className="flex h-[50vh] w-full flex-col items-center justify-center">
                <Field error={errors.name} className="w-full">
                    <input
                        type="text"
                        className="mx-auto w-[80%] rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                        placeholder="Enter Fee Category Name"
                        {...register('name', { required: 'Fee Type Name is required' })}
                    />
                </Field>
            </div>
        </ModalUI>
    );
};

export default EditFeeCategoryModalFormContainer;
