import ExamFinalModalStepComponent from '@/Components/Finance/Earnings/ExamFinalModalStepComponent';
import ExamModalStepFourComponent from '@/Components/Finance/Earnings/ExamModalStepFourComponent';
import ModalStepOneComponent from '@/Components/Finance/Earnings/ModalStepOneComponent';
import ModalStepThreeComponent from '@/Components/Finance/Earnings/ModalStepThreeComponent';
import ModalStepTwoComponent from '@/Components/Finance/Earnings/ModalStepTwoComponent';
import ModalComponent from '@/Components/Finance/ModalComponent';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import AdmissionFeeContainer from './AdmissionFeeContainer';
import MonthlyFeeContainer from './MonthlyFeeContainer';

const AddMoneyContainer = ({ modal, setModal }) => {
    const [step, setStep] = useState(1);
    const [studentId, setStudentId] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [type, setType] = useState();
    const [comments, setComments] = useState(null);
    let content = null;
    const [fee, setFee] = useState({
        boarding_fee: 0,
        academic_fee: 0,
        boarding_due: 0,
        academic_due: 0,
        total: 0,
        discount: 0,
    });

    const [api, contextHolder] = notification.useNotification();

    const getData = async (data) => {
        try {
            setLoading(true);
            const { data: info } = await axios.get(
                route('finance.get_user_data', { user_id: studentId.replace(/\s+/g, ''), year: data || year, type: type }),
            );
            if (info) {
                setData(info);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const submitData = () => {
        router.post(
            route('finance.add_money'),
            {
                student_id: studentId,
                type: type,
                monthlyInfo: selectedRows,
                year,
                details: comments,
                ...fee,
            },
            {
                onStart: () => {
                    setLoading(true);
                },
                onSuccess: (response) => {
                    router.flushAll();
                    // Move to final confirmation step instead of resetting
                    setLoading(false);
                    if (response.props.flash.success) {
                        type === 'exam_fee' ? setStep(7) : setStep(0);
                        api.success({
                            message: 'Success',
                            description: response.props.flash.success,
                            placement: 'bottomRight',
                        });
                    }
                    if (response.props.flash.error) {
                        api.error({
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
                    setLoading(false);
                },
            },
        );
    };

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
        setData(null);
        setType(null);
        setStudentId('');
        // setModal(false);
    };

    switch (step) {
        case 1:
            content = <ModalStepOneComponent setStep={setStep} setType={setType} />;
            break;
        case 2:
            content = (
                <ModalStepTwoComponent loading={loading} studentId={studentId} setStudentId={setStudentId} setStep={setStep} getData={getData} />
            );
            break;
        case 3:
            if (type === 'admission_fee') {
                content = (
                    <AdmissionFeeContainer
                        setModal={setModal}
                        setStep={setStep}
                        loading={loading}
                        type={type}
                        setType={setType}
                        data={data}
                        setStudentId={setStudentId}
                    />
                );
            } else if (type === 'monthly_fee') {
                content = (
                    <MonthlyFeeContainer
                        data={data}
                        setModal={setModal}
                        setStep={setStep}
                        year={year}
                        setYear={setYear}
                        getData={getData}
                        setFee={setFee}
                        fee={fee}
                        setSelectedRows={setSelectedRows}
                        selectedRows={selectedRows}
                        loading={loading}
                        setType={setType}
                        setStudentId={setStudentId}
                        setModal={setModal}
                    />
                );
            } else {
                content = (
                    <ModalStepThreeComponent
                        data={data}
                        loading={loading}
                        setStep={setStep}
                        year={year}
                        setYear={setYear}
                        fee={fee}
                        setFee={setFee}
                        setSelectedRows={setSelectedRows}
                        selectedRows={selectedRows}
                        getData={getData}
                        type={type}
                        submitData={submitData}
                    />
                );
            }
            break;
        case 6:
            content = (
                <ExamModalStepFourComponent
                    data={data}
                    loading={loading}
                    fee={fee}
                    selectedRows={selectedRows}
                    handleClose={handleClose}
                    setModal={setModal}
                    setStep={setStep}
                    setLoading={setLoading}
                    year={year}
                    comments={comments}
                    setComments={setComments}
                    submitData={submitData}
                />
            );
            break;
        case 7:
            content = (
                <ExamFinalModalStepComponent
                    data={data}
                    loading={loading}
                    fee={fee}
                    selectedRows={selectedRows}
                    handleClose={handleClose}
                    setModal={setModal}
                    setStep={setStep}
                    setLoading={setLoading}
                    year={year}
                    comments={comments}
                />
            );
            break;
        default:
            break;
    }

    return (
        <>
            {contextHolder}
            <ModalComponent modal={modal} setModal={setModal} content={content} />
        </>
    );
};

export default AddMoneyContainer;
