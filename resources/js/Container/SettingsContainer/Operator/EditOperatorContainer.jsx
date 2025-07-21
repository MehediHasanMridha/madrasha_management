import Field from '@/Components/UI/Field';
import ModalUI from '@/Components/UI/ModalUI';
import StaticBtn from '@/Components/UI/StaticBtn';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const EditOperatorContainer = ({ isOpen, onClose, operator, onSuccess }) => {
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        if (operator && isOpen) {
            setValue('name', operator.name || '');
            setValue('email', operator.email || '');
            setValue('phone', operator.phone || '');
            setValue('password', '');
        }
    }, [operator, isOpen, setValue]);

    const onSubmit = (data) => {
        console.log('Edit form submitted with data:', data);

        // Don't send password if it's empty
        const submitData = { ...data };
        if (!submitData.password || submitData.password.trim() === '') {
            delete submitData.password;
        }

        router.post(route('settings.operator.update', { id: operator.id }), submitData, {
            onBefore: () => {
                setSubmitting(true);
            },
            onSuccess: () => {
                notification.success({
                    message: 'Success',
                    description: 'Operator updated successfully',
                    placement: 'bottomRight',
                });
                onClose();
                onSuccess?.();
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
                const errorMessage = Object.values(errors).flat().join(', ') || 'Failed to update operator';
                notification.error({
                    message: 'Error',
                    description: errorMessage,
                    placement: 'bottomRight',
                });
            },
            onFinish: () => {
                setSubmitting(false);
            },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <ModalUI isModalOpen={isOpen} handleCancel={handleClose} title="Edit Operator">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field error={errors.name} label="Name" className="mb-4">
                    <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 p-4 focus:outline-none"
                        {...register('name', {
                            required: 'Name is required',
                        })}
                        placeholder="Name"
                    />
                </Field>

                <Field error={errors.email} label="Email" className="mb-4">
                    <input
                        type="email"
                        className="w-full rounded-md border border-gray-300 p-4 focus:outline-none"
                        {...register('email')}
                        placeholder="Email"
                    />
                </Field>

                <Field error={errors.phone} label="Phone Number" className="mb-4">
                    <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 p-4 focus:outline-none"
                        {...register('phone', {
                            pattern: {
                                value: /^[0-9]{11}$/,
                                message: 'Phone number must be 11 digits',
                            },
                        })}
                        placeholder="Phone Number"
                    />
                </Field>

                <Field error={errors.password} label="Password (Leave empty to keep current)" className="mb-4">
                    <input
                        type="password"
                        className="w-full rounded-md border border-gray-300 p-4 focus:outline-none"
                        {...register('password', {
                            minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        })}
                        placeholder="New Password (Optional)"
                    />
                </Field>

                <div className="flex justify-end gap-2">
                    <StaticBtn type="button" onClick={handleClose} className="bg-gray-500 text-white hover:bg-gray-600">
                        Cancel
                    </StaticBtn>
                    <StaticBtn type="submit" disabled={submitting} className={submitting ? 'cursor-not-allowed opacity-50' : ''}>
                        {submitting ? 'Updating...' : 'Update Operator'}
                    </StaticBtn>
                </div>
            </form>
        </ModalUI>
    );
};

export default EditOperatorContainer;
