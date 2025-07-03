import ExamFinalModalStepComponent from '@/Components/Finance/Earnings/ExamFee/ExamFinalModalStepComponent';
import ExamModalStepFourComponent from '@/Components/Finance/Earnings/ExamFee/ExamModalStepFourComponent';
import ExamModalStepOneComponent from '@/Components/Finance/Earnings/ExamFee/ExamModalStepOneComponent';
import LoadingUI from '@/Components/UI/LoadingUI';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';

const ExamFeeContainer = ({ data, year, setYear, getData, loading, setStep, setType, setStudentId, setModal }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [examFeeStep, setExamFeeStep] = useState(1);
    const [comments, setComments] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fee, setFee] = useState({
        boarding_fee: 0,
        academic_fee: 0,
        boarding_due: 0,
        academic_due: 0,
        total: 0,
        discount: 0,
    });

    const handleClose = () => {
        setStep(1);
        setFee({
            boarding_fee: 0,
            academic_fee: 0,
            boarding_due: 0,
            academic_due: 0,
            total: 0,
            discount: 0,
        });
        setSelectedRows([]);
        setType(null);
        setStudentId('');
        setModal(false);
    };

    const submitData = () => {
        router.post(
            route('finance.add_money'),
            {
                student_id: data?.unique_id,
                type: 'exam_fee',
                monthlyInfo: selectedRows,
                year,
                details: comments,
                ...fee,
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
                        setExamFeeStep((prev) => prev + 1);
                        notification.success({
                            message: 'Success',
                            description: response.props.flash.success,
                            placement: 'bottomRight',
                        });
                    }
                    if (response.props.flash.error) {
                        notification.error({
                            message: 'Error',
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

    if (loading || !data) {
        return (
            <div className="flex h-full items-center justify-center">
                <LoadingUI />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    let content = null;

    switch (examFeeStep) {
        case 1:
            content = (
                <ExamModalStepOneComponent
                    data={data}
                    loading={loading}
                    setStep={setStep}
                    setExamFeeStep={setExamFeeStep}
                    year={year}
                    setYear={setYear}
                    fee={fee}
                    setFee={setFee}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    getData={getData}
                />
            );
            break;
        case 2:
            content = (
                <ExamModalStepFourComponent
                    data={data}
                    loading={isSubmitting}
                    fee={fee}
                    selectedRows={selectedRows}
                    handleClose={handleClose}
                    setModal={setModal}
                    setStep={setExamFeeStep}
                    setLoading={setIsSubmitting}
                    year={year}
                    comments={comments}
                    setComments={setComments}
                    submitData={submitData}
                />
            );
            break;
        case 3:
            content = (
                <ExamFinalModalStepComponent
                    data={data}
                    loading={isSubmitting}
                    fee={fee}
                    selectedRows={selectedRows}
                    handleClose={handleClose}
                    setLoading={setIsSubmitting}
                    year={year}
                    comments={comments}
                />
            );
            break;
        default:
            break;
    }

    return content;
};

export default ExamFeeContainer;
