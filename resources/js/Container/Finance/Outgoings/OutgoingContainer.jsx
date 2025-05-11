import OutgoingComponent from '@/Components/Finance/Outgoings/OutgoingComponent';
import { useState } from 'react';

const OutgoingContainer = ({ outgoings, voucherList }) => {
    const [activeTab, setActiveTab] = useState('outgoings');
    const [modal, setModal] = useState(false);
    const [voucherModal, setVoucherModal] = useState({
        isOpen: false,
        data: null,
    });
    return (
        <OutgoingComponent
            outgoings={outgoings}
            voucherList={voucherList}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            modal={modal}
            setModal={setModal}
            voucherModal={voucherModal}
            setVoucherModal={setVoucherModal}
        />
    );
};

export default OutgoingContainer;
