import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const EditVoucherTypeModalFormContainer = () => {
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
        }
    }, [passData, setValue]);

    const handleCancel = () => {
        setModal({ edit: false });
        reset();
    };

    const onSubmit = (data) => {
        router.put(route('settings.voucher-types.update', passData.id), data, {
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
            isModalOpen={modal?.edit}
            handleCancel={handleCancel}
            width={'80%'}
            title="Edit Voucher Type"
            footer={() => (
                <SubmitBtn
                    loadingIndicator={isLoading}
                    btnText={'Update Voucher Type'}
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <form className="max-h-[70vh] overflow-y-scroll">
                <FieldSet label={'Voucher Type Information'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field error={errors.name} label={'Voucher Type Name'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Voucher Type Name"
                            {...register('name', { required: 'Voucher Type Name is required' })}
                        />
                    </Field>
                </FieldSet>
            </form>
        </ModalUI>
    );
};

export default EditVoucherTypeModalFormContainer;
