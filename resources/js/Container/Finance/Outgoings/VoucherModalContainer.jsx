import VoucherModalComponent from '@/Components/Finance/Outgoings/VoucherModalComponent';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const VoucherModalContainer = ({ modal, setModal }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handlePOPCancel = () => {
        setOpen(false);
    };

    const HandleDelete = (data) => {
        setConfirmLoading(true);
        router.delete(route('finance.delete_voucher', data?.id), {
            onFinish: () => {
                setConfirmLoading(false);
                setOpen(false);
                setModal(false);
            },
            onError: (errors) => {
                console.log('🚀 ~ router.delete ~ errors:', errors);
                setConfirmLoading(false);
                setOpen(false);
                setModal(false);
            },
        });
    };

    const handleCancel = () => {
        setModal(false);
    };

    return (
        <VoucherModalComponent
            data={modal?.data}
            confirmLoading={confirmLoading}
            open={open}
            setOpen={setOpen}
            isModalOpen={modal?.isOpen}
            handlePOPCancel={handlePOPCancel}
            HandleDelete={HandleDelete}
            handleCancel={handleCancel}
        />
    );
};

export default VoucherModalContainer;
