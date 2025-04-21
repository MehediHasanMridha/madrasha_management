import ModalStepOneComponent from '@/Components/Finance/Earnings/ModalStepOneComponent';
import ModalStepThreeComponent from '@/Components/Finance/Earnings/ModalStepThreeComponent';
import ModalStepTwoComponent from '@/Components/Finance/Earnings/ModalStepTwoComponent';
import ModalComponent from '@/Components/Finance/ModalComponent';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';

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
    });
    const [month, setMonth] = useState('January');
    const [type, setType] = useState();

    let content = null;

    const [api, contextHolder] = notification.useNotification();

    const getData = async () => {
        try {
            setLoading(true);
            const { data: info } = await axios.get(route('finance.get_user_data', { user_id: studentId }));
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
                month: month,
                boarding_fee: fee.boarding_fee,
                academic_fee: fee.academic_fee,
                boarding_due: fee.boarding_due,
                academic_due: fee.academic_due,
                type: type,
            },
            {
                onStart: () => {
                    setLoading(true);
                },
                onSuccess: (response) => {
                    setLoading(false);
                    setStep(1);
                    setStudentId('');
                    setFee({
                        boarding_fee: 0,
                        academic_fee: 0,
                        boarding_due: 0,
                        academic_due: 0,
                    });
                    setData(null);
                    setModal(false);
                    api.success({
                        message: 'Success',
                        description: response.props.flash.success,
                        placement: 'bottomRight',
                    });
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

    switch (step) {
        case 1:
            content = <ModalStepOneComponent setStep={setStep} setType={setType} />;

            break;
        case 2:
            content = <ModalStepTwoComponent studentId={studentId} setStudentId={setStudentId} setStep={setStep} getData={getData} />;
            break;
        case 3:
            content = (
                <ModalStepThreeComponent
                    data={data}
                    loading={loading}
                    setStep={setStep}
                    month={month}
                    setMonth={setMonth}
                    fee={fee}
                    setFee={setFee}
                    type={type}
                    setType={setType}
                    submitData={submitData}
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
