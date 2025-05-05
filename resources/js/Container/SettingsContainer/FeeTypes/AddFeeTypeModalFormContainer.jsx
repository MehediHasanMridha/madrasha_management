import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddFeeTypeModalFormContainer = () => {
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
        router.post(route('settings.fee-types.store'), data, {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: () => {
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
            isModalOpen={modal?.add}
            handleCancel={handleCancel}
            width={'80%'}
            title="Add Fee Type"
            footer={() => (
                <SubmitBtn
                    loadingIndicator={isLoading}
                    btnText={'Add Fee Type'}
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <form className="max-h-[70vh] overflow-y-scroll">
                <FieldSet label={'Fee Type Information'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field error={errors.name} label={'Fee Type Name'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Fee Type Name"
                            {...register('name', { required: 'Fee Type Name is required' })}
                        />
                    </Field>
                    <Field error={errors.default_amount} label={'Default Amount'}>
                        <input
                            type="number"
                            step="0.01"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Default Amount"
                            {...register('default_amount', {
                                min: { value: 0, message: 'Amount must be positive' },
                            })}
                        />
                    </Field>
                    <Field error={errors.is_variable} label={'Variable Amount'}>
                        <select
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            {...register('is_variable')}
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </Field>
                </FieldSet>
            </form>
        </ModalUI>
    );
};

export default AddFeeTypeModalFormContainer;
