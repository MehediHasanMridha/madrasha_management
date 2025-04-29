import FinalModalStepComponent from '@/Components/Finance/Earnings/FinalModalStepComponent';
import ModalStepFiveComponent from '@/Components/Finance/Earnings/ModalStepFiveComponent';
import ModalStepFourComponent from '@/Components/Finance/Earnings/ModalStepFourComponent';
import ModalStepOneComponent from '@/Components/Finance/Earnings/ModalStepOneComponent';
import ModalStepThreeComponent from '@/Components/Finance/Earnings/ModalStepThreeComponent';
import ModalStepTwoComponent from '@/Components/Finance/Earnings/ModalStepTwoComponent';
import ModalComponent from '@/Components/Finance/ModalComponent';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AddMoneyContainer = ({ modal, setModal }) => {
    const [step, setStep] = useState(1);
    const [studentId, setStudentId] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [fee, setFee] = useState({
        boarding_fee: 0,
        academic_fee: 0,
        boarding_due: 0,
        academic_due: 0,
        total: 0,
        discount: 0,
    });
    const [selectedRows, setSelectedRows] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [type, setType] = useState();
    const [comments, setComments] = useState(null);
    let content = null;

    useEffect(() => {
        setFee({
            ...fee,
            academic_due: selectedRows.reduce((acc, curr) => acc + curr?.academic_fee, 0) - fee.academic_fee,
            boarding_due: selectedRows.reduce((acc, curr) => acc + curr?.boarding_fee, 0) - fee.boarding_fee,
        });
    }, [fee?.academic_fee, fee.boarding_fee, selectedRows]);

    const [api, contextHolder] = notification.useNotification();

    const getData = async (data) => {
        try {
            setLoading(true);
            const { data: info } = await axios.get(route('finance.get_user_data', { user_id: studentId, year: data || year }));
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
                    // Move to final confirmation step instead of resetting
                    // setLoading(false);
                    if (response.props.flash.success) {
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
            content = (
                <ModalStepThreeComponent
                    data={data}
                    loading={loading}
                    setStep={setStep}
                    year={year}
                    setYear={setYear}
                    fee={fee}
                    setFee={setFee}
                    type={type}
                    setType={setType}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    getData={getData}
                />
            );
            break;
        case 4:
            content = (
                <ModalStepFourComponent
                    data={data}
                    loading={loading}
                    setStep={setStep}
                    year={year}
                    setYear={setYear}
                    fee={fee}
                    setFee={setFee}
                    type={type}
                    setType={setType}
                    submitData={submitData}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    comments={comments}
                    setComments={setComments}
                />
            );
            break;
        case 5:
            content = (
                <ModalStepFiveComponent
                    data={data}
                    loading={loading}
                    setStep={setStep}
                    fee={fee}
                    setFee={setFee}
                    submitData={submitData}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    setLoading={setLoading}
                    comments={comments}
                />
            );
            break;
        case 0:
            content = (
                <FinalModalStepComponent
                    data={data}
                    loading={loading}
                    fee={fee}
                    selectedRows={selectedRows}
                    handleClose={handleClose}
                    setModal={setModal}
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
