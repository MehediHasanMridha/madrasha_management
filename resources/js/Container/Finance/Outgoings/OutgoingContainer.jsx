import OutgoingComponent from '@/Components/Finance/Outgoings/OutgoingComponent';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const OutgoingContainer = ({ outgoings, voucherList }) => {
    const [activeTab, setActiveTab] = useState('outgoings');
    const [modal, setModal] = useState(false);
    const [voucherModal, setVoucherModal] = useState({
        isOpen: false,
        data: null,
    });
    const handleYearMonthChange = (year, month) => {
        router.get(
            route('finance.outgoings'),
            {
                year: year,
                month: month,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };
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
            handleYearMonthChange={handleYearMonthChange}
        />
    );
};

export default OutgoingContainer;
