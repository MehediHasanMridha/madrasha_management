import DueModalStepOneComponent from '@/Components/Finance/Earnings/MonthlyDueFee/DueModalStepOneComponent';
import DueModalStepTwoComponent from '@/Components/Finance/Earnings/MonthlyDueFee/DueModalStepTwoComponent';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';

const MonthlyDueFeeContainer = ({ setMonthlyFeeStep, selectedRows, loading, data, selectedDueData, handleClose }) => {
    const [monthlyDueFeeStep, setMonthlyDueFeeStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [comments, setComments] = useState('');
    let content = null;

    const submitData = () => {
        router.post(
            route('finance.add_due_money'),
            {
                academic_income_id: selectedDueData?.academic_fee_id,
                boarding_income_id: selectedDueData?.boarding_fee_id,
                academic_due: selectedDueData?.academic_fee_due,
                boarding_due: selectedDueData?.boarding_fee_due,
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
                        setMonthlyDueFeeStep((prev) => prev + 1);
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

    switch (monthlyDueFeeStep) {
        case 1:
            content = (
                <DueModalStepOneComponent
                    data={data}
                    setMonthlyFeeStep={setMonthlyFeeStep}
                    loading={isSubmitting}
                    selectedDueData={selectedDueData}
                    comments={comments}
                    setComments={setComments}
                    submitData={submitData}
                />
            );
            break;
        case 2:
            content = (
                <DueModalStepTwoComponent
                    data={data}
                    setMonthlyDueFeeStep={setMonthlyDueFeeStep}
                    selectedDueData={selectedDueData}
                    loading={isSubmitting}
                    comments={comments}
                />
            );

        default:
            break;
    }
    return content;
};

export default MonthlyDueFeeContainer;
