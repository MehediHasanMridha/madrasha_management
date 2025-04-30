import EarningComponent from '@/Components/Finance/Earnings/EarningComponent';
import { useState } from 'react';

const EarningContainer = () => {
    const [modal, setModal] = useState(false);
    const [step, setStep] = useState(1);
    return <EarningComponent modal={modal} setModal={setModal} />;
};

export default EarningContainer;
