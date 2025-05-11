import OutgoingComponent from '@/Components/Finance/Outgoings/OutgoingComponent';
import { useState } from 'react';

const OutgoingContainer = ({ outgoings, voucherList }) => {
    const [activeTab, setActiveTab] = useState('outgoings');
    const [modal, setModal] = useState(false);
    return (
        <OutgoingComponent
            outgoings={outgoings}
            voucherList={voucherList}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            modal={modal}
            setModal={setModal}
        />
    );
};

export default OutgoingContainer;
