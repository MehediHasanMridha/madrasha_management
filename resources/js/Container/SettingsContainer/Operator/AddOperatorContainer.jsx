import Field from '@/Components/UI/Field';
import ModalUI from '@/Components/UI/ModalUI';
import StaticBtn from '@/Components/UI/StaticBtn';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getStaffData } from './api/getStaffData';

const AddOperatorContainer = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const { data, mutate } = getStaffData();
    const [submitting, setSubmitting] = useState(false);

    const handleUserChange = (e) => {
        const userId = e.target.value;
        const user = data?.data?.find((staff) => staff.id === parseInt(userId));
        setSelectedUser(user || {});
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        console.log('Form submitted with data:', data);
        router.post(
            route('settings.operator.add'),
            {
                ...data,
                user_id: selectedUser.id,
                email: selectedUser.email || data.email,
                phone: selectedUser.phone || data.phone,
            },
            {
                onBefore: () => {
                    setSubmitting(true);
                },

                onSuccess: () => {
                    notification.success({
                        message: 'Success',
                        description: 'Operator added successfully',
                        placement: 'bottomRight',
                    });
                    setOpenModal(false);
                },
                onError: (errors) => {
                    notification.error({
                        message: 'Error',
                        description: 'Failed to add operator',
                        placement: 'bottomRight',
                    });
                },

                onFinish: () => {
                    setSubmitting(false);
                    setOpenModal(false);
                    reset();
                    setSelectedUser({});
                    mutate(); // Refresh the staff data
                },
            },
        );
    };

    return (
        <>
            <StaticBtn className="ml-auto w-fit" onClick={() => setOpenModal(true)}>
                Add operator
            </StaticBtn>
            <ModalUI isModalOpen={openModal} handleCancel={() => setOpenModal(false)}>
                <Field error={errors.user_id} label="Select Operator" className="mb-4">
                    <select
                        name=""
                        {...register('user_id', { required: 'Operator is required' })}
                        onChange={handleUserChange}
                        className="w-full rounded-md border border-gray-300 p-4 focus:outline-none"
                    >
                        <option className="border-2 border-gray-300" value="">
                            Select operator
                        </option>
                        {data?.data?.map((staff) => (
                            <option key={staff.id} value={staff.id} className="border-2 border-gray-500 p-2">
                                {staff.name}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label="Email (optional)" className="mb-4">
                    <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 p-4 focus:outline-none"
                        name=""
                        {...register('email')}
                        placeholder="Email"
                        value={selectedUser.email || ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    />
                </Field>
                <Field error={errors.phone} label="Phone Number" className="mb-4">
                    <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 p-4 focus:outline-none"
                        {...register('phone', {
                            required: !selectedUser.phone ? 'Phone number is required' : false,
                            pattern: {
                                value: /^[0-9]{11}$/,
                                message: 'Phone number must be 11 digits',
                            },
                        })}
                        placeholder="Phone Number"
                        value={selectedUser.phone || ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                    />
                </Field>
                <Field error={errors.password} label="Password" className="mb-4">
                    <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 p-4 focus:outline-none"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        })}
                        placeholder="Password"
                    />
                </Field>
                <StaticBtn
                    disabled={submitting}
                    className={submitting ? 'cursor-not-allowed opacity-50' : ''}
                    onClick={handleSubmit(onSubmit)}
                    className="ml-auto w-fit"
                >
                    Add Operator
                </StaticBtn>
            </ModalUI>
        </>
    );
};

export default AddOperatorContainer;
