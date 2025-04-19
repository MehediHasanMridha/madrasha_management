import EarningComponent from '@/Components/Finance/Earnings/EarningComponent';
import { useState } from 'react';

const EarningContainer = () => {
    const [modal, setModal] = useState(false);
    const [activeTab, setActiveTab] = useState('earnings');
    const [step, setStep] = useState(1);
    return <EarningComponent activeTab={activeTab} setActiveTab={setActiveTab} modal={modal} setModal={setModal} />;
};

export default EarningContainer;
