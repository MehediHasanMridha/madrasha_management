import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import StudentSectionComponent from '../../Components/Department/StudentSectionComponent';

const StudentSectionContainer = ({ department, students, filters, sortOrder }) => {
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
        <StudentSectionComponent
            contextHolder={contextHolder}
            department={department}
            students={students}
            filters={filters}
            sortOrder={sortOrder}
            isModalOpen={isModalOpen}
            isLoading={isLoading}
            handleOk={handleOk}
            handleCancel={handleCancel}
            setIsModalOpen={setIsModalOpen}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            control={control}
        />
    );
};

export default StudentSectionContainer;
