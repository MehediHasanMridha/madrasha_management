import ExamModalComponent from '@/Components/Department/Exams/ExamModalComponent';
import ExamModalStepComponent from '@/Components/Department/Exams/ExamModalStepComponent';
import ExamSuccessModalComponent from '@/Components/Department/Exams/ExamSuccessModalComponent';
import StaticBtn from '@/Components/UI/StaticBtn';
import { useDepartmentStore } from '@/stores';
import { notification } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const AddExamContainer = () => {
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('form'); // 'form' | 'success'
    const [api, contextHolder] = notification.useNotification();
    const { data, setData, resetData } = useDepartmentStore((state) => state);
    const [isFeeEnabled, setIsFeeEnabled] = useState(false);

    const handleSubmit = () => {
        setLoading(true);

        // Here you would typically make an API call to save the exam
        // For now, we'll simulate a successful submission
        setTimeout(() => {
            setLoading(false);
            setStep('success');
            api.success({
                message: 'Success',
                description: 'Exam created successfully!',
                placement: 'bottomRight',
            });
        }, 1000);

        // Example of how you might handle this with Inertia:
        /*
        router.post(
            route('department.exams.store'),
            {
                exam_name: formData.examName,
                start_date: formData.startDate,
                end_date: formData.endDate,
                exam_fee: formData.examFee,
                classes: formData.selectedClasses.map(c => c.id)
            },
            {
                onStart: () => setLoading(true),
                onSuccess: (response) => {
                    setLoading(false);
                    setStep('success');
                    if (response.props.flash.success) {
                        api.success({
                            message: 'Success',
                            description: response.props.flash.success,
                            placement: 'bottomRight',
                        });
                    }
                },
                onError: (error) => {
                    setLoading(false);
                    api.error({
                        message: 'Error',
                        description: 'Failed to create exam. Please try again.',
                        placement: 'bottomRight',
                    });
                },
                onFinish: () => setLoading(false)
            }
        );
        */
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
