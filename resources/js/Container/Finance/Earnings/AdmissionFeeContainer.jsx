import AdmissionFeeModalStepOneComponent from '@/Components/Finance/Earnings/AdmissionFee/AdmissionFeeModalStepOneComponent';
import LoadingUI from '@/Components/UI/LoadingUI';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetDeptAndClass } from './api/useGetDeptAndClass';

const AdmissionFeeContainer = ({ setStep, data, type, loading }) => {
    const { data: allDepartments, isLoading } = useGetDeptAndClass();
    const [classes, setClasses] = useState([]);
    const [selectedClassAdmissionFee, setSelectedClassAdmissionFee] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isLoading && allDepartments?.data?.length > 0 && data?.department_id) {
            const foundDept = allDepartments.data.find((dept) => dept.id === data.department_id);
            setClasses(foundDept?.classes || []);
        }
    }, [allDepartments, isLoading, data?.department_id]);

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            admissionFee: 0,
        },
    });

    const comments = watch('comments');

    const submit = (values) => {
        router.post(
            route('finance.add_money'),
            {
                ...values,
                student_id: data?.unique_id,
                type: type,
                note: values.comments,
            },
            {
                onStart: () => {
                    setIsSubmitting(true);
                },
                onSuccess: (response) => {
                    router.flushAll();
                    // Move to final confirmation step instead of resetting
                    setIsSubmitting(false);
                    if (response.props.flash.success) {
                        notification.success({
                            message: 'Success',
                            description: response.props.flash.success,
                            placement: 'bottomRight',
                        });
                    }
                    if (response.props.flash.error) {
                        notification.error({
                            message: 'Success',
                            description: response.props.flash.error,
                            placement: 'bottomRight',
                        });
                    }
                },
                onError: (error) => {
                    console.error('Error submitting data:', error);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            },
        );
    };

    if (isLoading) {
        return <LoadingUI />;
    }
    if (!data || !allDepartments) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    background: '#f5f7fa',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                }}
            >
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#e0e7ef" />
                    <path
                        d="M9.17 9.17a3 3 0 1 1 5.66 0M12 13v2m0 2h.01"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div style={{ marginTop: '16px', color: '#374151', fontWeight: 500, fontSize: '1.1rem' }}>No data found</div>
                <div style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '4px' }}>Please check your connection or try again later.</div>
            </div>
        );
    }
    return (
        <AdmissionFeeModalStepOneComponent
            setClasses={setClasses}
            setStep={setStep}
            allDepartments={allDepartments?.data}
            data={data}
            classes={classes}
            selectedClassAdmissionFee={selectedClassAdmissionFee}
            setSelectedClassAdmissionFee={setSelectedClassAdmissionFee}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            setValue={setValue}
            comments={comments}
            submit={submit}
            isSubmitting={isSubmitting}
        />
    );
};

export default AdmissionFeeContainer;
