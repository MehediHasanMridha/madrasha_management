import ExamModalComponent from '@/Components/Department/Exams/ExamModalComponent';
import ExamModalStepComponent from '@/Components/Department/Exams/ExamModalStepComponent';
import ExamSuccessModalComponent from '@/Components/Department/Exams/ExamSuccessModalComponent';
import StaticBtn from '@/Components/UI/StaticBtn';
import { useDepartmentStore } from '@/stores';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const AddExamContainer = ({ classes, department }) => {
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('form'); // 'form' | 'success'
    const [api, contextHolder] = notification.useNotification();
    const { data, setData, resetData } = useDepartmentStore((state) => state);
    const [isFeeEnabled, setIsFeeEnabled] = useState(false);

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
        };

        // Make API call to create exam
        router.post(route('department.exams.store', { department_slug: department.slug }), examData, {
            onStart: () => setLoading(true),
            onSuccess: (response) => {
                setLoading(false);
                setStep('success');
                api.success({
                    message: 'Success',
                    description: 'Exam created successfully!',
                    placement: 'bottomRight',
                });
            },
            onError: (errors) => {
                setLoading(false);
                let errorMessage = 'Failed to create exam. Please try again.';

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
        });
    };

    const handleCancel = () => {
        setModal(false);
        setStep('form');
        resetData();
    };

    const handleCreateAnother = () => {
        setStep('form');
        setExamData(null);
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
                />
            );
            break;
    }

    return (
        <>
            {contextHolder}
            <div className="mt-[16px] flex justify-end">
                <StaticBtn
                    onClick={() => setModal(true)}
                    className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-600"
                >
                    <Plus className="h-4 w-4" />
                    Create exam
                </StaticBtn>
            </div>
            <ExamModalComponent modal={modal} handleCancel={handleCancel} content={content} />
        </>
    );
};

export default AddExamContainer;
