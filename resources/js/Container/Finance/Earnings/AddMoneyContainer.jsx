import ModalStepOneComponent from '@/Components/Finance/Earnings/ModalStepOneComponent';
import ModalStepTwoComponent from '@/Components/Finance/Earnings/ModalStepTwoComponent';
import ModalComponent from '@/Components/Finance/ModalComponent';
import { notification } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import AdmissionFeeContainer from './AdmissionFeeContainer';
import ExamFeeContainer from './ExamFeeContainer';
import MonthlyFeeContainer from './MonthlyFeeContainer';

const AddMoneyContainer = ({ modal, setModal }) => {
    const [step, setStep] = useState(1);
    const [studentId, setStudentId] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [type, setType] = useState();
    let content = null;

    const getData = async (data) => {
        setData(null);
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
            setStep((prev) => prev - 1);
            notification.error({
                message: 'Error',
                description: 'This student ID does not exist',
                placement: 'bottomRight',
            });
        } finally {
            setLoading(false);
        }
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
                        loading={loading}
                        setType={setType}
                        setStudentId={setStudentId}
                    />
                );
            } else {
                content = (
                    <ExamFeeContainer
                        data={data}
                        loading={loading}
                        setStep={setStep}
                        year={year}
                        setYear={setYear}
                        getData={getData}
                        setType={setType}
                        setStudentId={setStudentId}
                        setModal={setModal}
                    />
                );
            }
            break;
        default:
            break;
    }

    return <ModalComponent modal={modal} setModal={setModal} content={content} />;
};

export default AddMoneyContainer;
