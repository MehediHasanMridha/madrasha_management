import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddVoucherTypeModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { modal, setModal } = useBoundStore((state) => state);

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
        router.post(route('settings.voucher-types.store'), data, {
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
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <ModalUI
            isModalOpen={modal?.add}
            handleCancel={handleCancel}
            width={'30%'}
            title="Add Voucher Type"
            footer={() => (
                <SubmitBtn
                    loadingIndicator={isLoading}
                    btnText={'Add Voucher Type'}
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <FieldSet labelClassName="text-[16px] font-bold" className="md:grid-cols-1" hr={true}>
                <Field error={errors.name} label={'Voucher Type Name'}>
                    <input
                        type="text"
                        className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                        placeholder="Enter Voucher Type Name"
                        {...register('name', { required: 'Voucher Type Name is required' })}
                    />
                </Field>
            </FieldSet>
        </ModalUI>
    );
};

export default AddVoucherTypeModalFormContainer;
