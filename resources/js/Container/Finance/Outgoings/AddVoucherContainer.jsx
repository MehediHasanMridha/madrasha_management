import ModalComponent from '@/Components/Finance/ModalComponent';
import ExpenseModalStepOneComponent from '@/Components/Finance/Outgoings/ExpenseModalStepOneComponent';
import ExpenseModalStepThreeComponent from '@/Components/Finance/Outgoings/ExpenseModalStepThreeComponent';
import ExpenseModalStepTwoComponent from '@/Components/Finance/Outgoings/ExpenseModalStepTwoComponent';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const AddVoucherContainer = ({ modal, setModal }) => {
    const [step, setStep] = useState(1);
    const [staffId, setStaffId] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [type, setType] = useState();
    const [month, setMonth] = useState('January');
    const [salary, setSalary] = useState(0);

    let content = null;

    const [api, contextHolder] = notification.useNotification();

    const getData = async () => {
        try {
            setLoading(true);
            const { data: info } = await axios.get(route('finance.get_user_data', { user_id: staffId, type: 'staff' }));
            console.log('🚀 ~ getData ~ info:', info);
            if (info) {
                setData(info);
                setSalary(info.salary);
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
            route('finance.add_voucher'),
            {
                staff_id: staffId,
                month: month,
                salary: salary,
                type: type,
            },
            {
                onStart: () => {
                    setLoading(true);
                },
                onSuccess: (response) => {
                    setLoading(false);
                    setStep(1);
                    setStaffId('');
                    setSalary(0);
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
            content = <ExpenseModalStepOneComponent setStep={setStep} setType={setType} />;

            break;
        case 2:
            content = <ExpenseModalStepTwoComponent staffId={staffId} setStaffId={setStaffId} setStep={setStep} getData={getData} />;
            break;
        case 3:
            content = (
                <ExpenseModalStepThreeComponent
                    data={data}
                    setStep={setStep}
                    loading={loading}
                    month={month}
                    setMonth={setMonth}
                    salary={salary}
                    setSalary={setSalary}
                    submitData={submitData}
                />
            );
        default:
            break;
    }

    return (
        <>
            {contextHolder}
            <ModalComponent modal={modal} setModal={setModal} content={content} />;
        </>
    );
};

export default AddVoucherContainer;
