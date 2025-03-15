import StaffListComponent from '@/Components/Staff/StaffListComponent';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserGroup } from 'react-icons/fa6';

const StaffListContainer = ({ staff, filters, sortOrder }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        setFocus,
        setError,
    } = useForm();
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        formData.append('student_image', data.student_image[0]);
        formData.append('department_id', department.id);

        router.post(route('student.add_student', { department_slug: 'islamic_school' }), formData, {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
                api.success({
                    message: 'Student Added Successfully',
                    placement: 'bottomRight',
                });
                setIsLoading(false);
            },
            onError: (errors) => {
                if (errors.student_id) {
                    setFocus('student_id');
                    setError('student_id', {
                        message: errors.student_id,
                    });
                } else {
                    setFocus('contact_number');
                    setError('contact_number', {
                        message: errors.contact_number,
                    });
                }
                api.error({
                    message: errors.student_id || errors.contact_number,
                    placement: 'bottomRight',
                });
                setIsLoading(false);
            },
        });
    };

    return (
        <div>
            <div className="mt-[24px] flex space-x-[12px] rounded-[8px] bg-white p-[24px]">
                <span
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px] border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]',
                        // tab === 'students' && 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]',
                    )}
                    // onClick={() => setTab('students')}
                >
                    <FaUserGroup className="inline-flex" size={24} />
                    <span className="text-[16px]">Staff</span>
                </span>
            </div>
            <StaffListComponent
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                isLoading={isLoading}
                handleOk={handleOk}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                errors={errors}
                control={control}
                setIsLoading={setIsLoading}
                contextHolder={contextHolder}
                staff={staff}
                filters={filters}
                sortOrder={sortOrder}
            />
        </div>
    );
};

export default StaffListContainer;
