import FinalModalStepComponent from '@/Components/Finance/Earnings/MonthlyFee/FinalModalStepComponent';
import ModalStepFiveComponent from '@/Components/Finance/Earnings/MonthlyFee/ModalStepFiveComponent';
import ModalStepFourComponent from '@/Components/Finance/Earnings/MonthlyFee/ModalStepFourComponent';
import ModalStepOneComponent from '@/Components/Finance/Earnings/MonthlyFee/ModalStepOneComponent';
import LoadingUI from '@/Components/UI/LoadingUI';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

const MonthlyFeeContainer = ({ data, year, setYear, getData, loading, setStep, setType, setStudentId, setModal }) => {
    const [monthlyFeeStep, setMonthlyFeeStep] = useState(1);
    const [fee, setFee] = useState({
        boarding_fee: 0,
        academic_fee: 0,
        boarding_due: 0,
        academic_due: 0,
        total: 0,
        discount: 0,
    });
    const [selectedRows, setSelectedRows] = useState([]);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        setFee({
            ...fee,
            academic_due: selectedRows.reduce((acc, curr) => acc + curr?.academic_fee, 0) - fee.academic_fee,
            boarding_due: selectedRows.reduce((acc, curr) => acc + curr?.boarding_fee, 0) - fee.boarding_fee,
        });
    }, [fee?.academic_fee, fee.boarding_fee, selectedRows]);

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
                type: 'monthly_fee',
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
                        setMonthlyFeeStep((prev) => prev + 1);
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
            <div className="flex h-[400px] items-center justify-center">
                <LoadingUI />
            </div>
        );
    }

    if (!data) {
        return <div className="flex h-[400px] items-center justify-center">No data found</div>;
    }

    let content = null;
    switch (monthlyFeeStep) {
        case 1:
            content = (
                <ModalStepOneComponent
                    data={data}
                    setStep={setStep}
                    setMonthlyFeeStep={setMonthlyFeeStep}
                    year={year}
                    setYear={setYear}
                    fee={fee}
                    setFee={setFee}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    getData={getData}
                    loading={loading}
                />
            );
            break;
        case 2:
            content = (
                <ModalStepFourComponent
                    data={data}
                    loading={loading}
                    setStep={setMonthlyFeeStep}
                    year={year}
                    setYear={setYear}
                    fee={fee}
                    setFee={setFee}
                    submitData={submitData}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    comments={comments}
                    setComments={setComments}
                />
            );
            break;
        case 3:
            content = (
                <ModalStepFiveComponent
                    data={data}
                    loading={loading}
                    setStep={setMonthlyFeeStep}
                    fee={fee}
                    setFee={setFee}
                    submitData={submitData}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    setLoading={setIsSubmitting}
                    comments={comments}
                    year={year}
                />
            );
            break;
        case 4:
            content = (
                <FinalModalStepComponent
                    data={data}
                    loading={isSubmitting}
                    fee={fee}
                    selectedRows={selectedRows}
                    handleClose={handleClose}
                    setModal={setModal}
                    setStep={setStep}
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

export default MonthlyFeeContainer;
