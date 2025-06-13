import ExamModalComponent from '@/Components/Department/Exams/ExamModalComponent';
import ExamModalStepComponent from '@/Components/Department/Exams/ExamModalStepComponent';
import ExamSuccessModalComponent from '@/Components/Department/Exams/ExamSuccessModalComponent';
import { useDepartmentStore } from '@/stores';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

const EditExamContainer = ({ classes, department }) => {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('form'); // 'form' | 'success'
    const [api, contextHolder] = notification.useNotification();
    const { modal, setModal, data, setData, resetData } = useDepartmentStore((state) => state);
    const [isFeeEnabled, setIsFeeEnabled] = useState(false);

    // Populate form with existing exam data when modal opens
    useEffect(() => {
        if (modal.editExam && modal.data) {
            const examData = modal.data;
            setData({
                examName: examData.name || '',
                startDate: examData.start_date ? examData.start_date.split('T')[0] : '',
                endDate: examData.end_date ? examData.end_date.split('T')[0] : '',
                examFee: examData.exam_fee || '',
                totalMarks: examData.total_marks || 100,
                passMarks: examData.pass_marks || 40,
                classes: examData.classes || [],
                description: examData.description || '',
                durationMinutes: examData.duration_minutes || '',
                instructions: examData.instructions || '',
                registrationStart: examData.registration_start ? examData.registration_start.split('T')[0] : '',
                registrationEnd: examData.registration_end ? examData.registration_end.split('T')[0] : '',
            });
            setIsFeeEnabled(!!examData.exam_fee && examData.exam_fee > 0);
        }
    }, [modal.editExam, modal.data, setData]);

    const handleSubmit = () => {
        setLoading(true);

        // Prepare the exam data for submission
        const examData = {
            examName: data?.examName,
            startDate: data?.startDate,
            endDate: data?.endDate,
            examFee: isFeeEnabled ? parseFloat(data.examFee) || 0 : null,
            selectedClasses: data?.classes || [],
            totalMarks: parseInt(data.totalMarks) || 100,
            passMarks: parseInt(data.passMarks) || 40,
            description: data?.description,
            durationMinutes: parseInt(data.durationMinutes) || null,
            instructions: data?.instructions,
            registrationStart: data?.registrationStart,
            registrationEnd: data?.registrationEnd,
        };

        // Make API call to update exam
        router.put(
            route('department.exams.update', {
                department_slug: department.slug,
                exam_id: modal.data.id,
            }),
            examData,
            {
                onStart: () => setLoading(true),
                onSuccess: (response) => {
                    setLoading(false);
                    setStep('success');
                    api.success({
                        message: 'Success',
                        description: 'Exam updated successfully!',
                        placement: 'bottomRight',
                    });
                },
                onError: (errors) => {
                    setLoading(false);
                    let errorMessage = 'Failed to update exam. Please try again.';

                    // Check if there are specific validation errors
                    if (errors && typeof errors === 'object') {
                        const firstError = Object.values(errors)[0];
                        if (Array.isArray(firstError)) {
                            errorMessage = firstError[0];
                        } else if (typeof firstError === 'string') {
                            errorMessage = firstError;
                        }
                    }

                    api.error({
                        message: 'Error',
                        description: errorMessage,
                        placement: 'bottomRight',
                    });
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    const handleCancel = () => {
        setModal({ editExam: false, data: null });
        setStep('form');
        resetData();
        setIsFeeEnabled(false);
    };

    const handleCreateAnother = () => {
        setStep('form');
        resetData();
        setIsFeeEnabled(false);
    };

    let content = null;

    switch (step) {
        case 'form':
            content = (
                <ExamModalStepComponent
                    onCancel={handleCancel}
                    loading={loading}
                    handleSubmit={handleSubmit}
                    isFeeEnabled={isFeeEnabled}
                    setIsFeeEnabled={setIsFeeEnabled}
                    data={data}
                    setData={setData}
                    classes={classes}
                    isEdit={true}
                />
            );
            break;
        case 'success':
            content = <ExamSuccessModalComponent examData={data} onClose={handleCancel} onCreateAnother={handleCreateAnother} />;
            break;
        default:
            content = (
                <ExamModalStepComponent
                    onCancel={handleCancel}
                    loading={loading}
                    handleSubmit={handleSubmit}
                    isFeeEnabled={isFeeEnabled}
                    setIsFeeEnabled={setIsFeeEnabled}
                    data={data}
                    setData={setData}
                    classes={classes}
                    isEdit={true}
                />
            );
            break;
    }

    return (
        <>
            {contextHolder}
            <ExamModalComponent modal={modal.editExam} handleCancel={handleCancel} content={content} title="Edit exam" />
        </>
    );
};

export default EditExamContainer;
