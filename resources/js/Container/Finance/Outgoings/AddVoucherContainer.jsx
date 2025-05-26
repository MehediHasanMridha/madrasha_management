import ModalComponent from '@/Components/Finance/ModalComponent';
import ExpenseFinalStepComponent from '@/Components/Finance/Outgoings/AllModelStep/ExpenseFinalStepComponent';
import ExpenseModalStepOneComponent from '@/Components/Finance/Outgoings/AllModelStep/ExpenseModalStepOneComponent';
import ExpenseModalStepThreeComponent from '@/Components/Finance/Outgoings/AllModelStep/ExpenseModalStepThreeComponent';
import ExpenseModalStepTwoComponent from '@/Components/Finance/Outgoings/AllModelStep/ExpenseModalStepTwoComponent';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import OtherModelStepTwoContainer from './OtherModelStepTwoContainer';

const AddVoucherContainer = ({ modal, setModal }) => {
    const [step, setStep] = useState(1);
    const [staffId, setStaffId] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [type, setType] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [selectedRows, setSelectedRows] = useState([]);
    const [expense, setExpense] = useState({
        amount: 0,
        note: '',
    });

    const [api, contextHolder] = notification.useNotification();

    const getData = async (data) => {
        try {
            setLoading(true);
            const { data: info } = await axios.get(
                route('finance.get_user_data', {
                    user_id: staffId.replace(/\s+/g, ''), // Remove all spaces from staffId
                    type: 'staff',
                    year: data || year,
                }),
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
            route('finance.add_voucher'),
            {
                staff_id: staffId,
                type: type,
                monthlyInfo: selectedRows,
                year,
                expense,
            },
            {
                onStart: () => {
                    setLoading(true);
                },
                onSuccess: (response) => {
                    setLoading(false);
                    if (response.props.flash.success) {
                        setStep(0);
                        api.success({
                            message: 'Success',
                            description: response.props.flash.success,
                            placement: 'bottomRight',
                        });
                    }
                    if (response.props.flash.error) {
                        api.error({
                            message: 'Error',
                            description: response.props.flash.error,
                            placement: 'bottomRight',
                        });
                    }
                    router.flushAll();
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
        setExpense({
            amount: 0,
            note: '',
        });
        setSelectedRows([]);
        setData(null);
        setType(null);
        setStaffId('');
    };

    let content = null;
    switch (step) {
        case 1:
            content = <ExpenseModalStepOneComponent setStep={setStep} setType={setType} />;
            break;
        case 2:
            content =
                type === 'salary' ? (
                    <ExpenseModalStepTwoComponent loading={loading} staffId={staffId} setStaffId={setStaffId} setStep={setStep} getData={getData} />
                ) : (
                    <OtherModelStepTwoContainer api={api} type={type} setStep={setStep} setType={setType} />
                );
            break;
        case 3:
            content = (
                <ExpenseModalStepThreeComponent
                    data={data}
                    loading={loading}
                    setStep={setStep}
                    expense={expense}
                    setExpense={setExpense}
                    submitData={submitData}
                    year={year}
                    setYear={setYear}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    getData={getData}
                />
            );
            break;
        case 0:
            content = (
                <ExpenseFinalStepComponent
                    data={data}
                    loading={loading}
                    expense={expense}
                    handleClose={handleClose}
                    setModal={setModal}
                    setStep={setStep}
                    selectedRows={selectedRows}
                    setLoading={setLoading}
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

export default AddVoucherContainer;
