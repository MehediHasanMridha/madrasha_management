import StaticBtn from '@/Components/UI/StaticBtn';
import { useBoundStore } from '@/stores';
import { notification } from 'antd';
import { useState } from 'react';
import AddVoucherTypeModalFormContainer from './AddVoucherTypeModalFormContainer';
import EditVoucherTypeModalFormContainer from './EditVoucherTypeModalFormContainer';
import VoucherTypeTableListContainer from './VoucherTypeTableListContainer';

const VoucherTypeContainer = ({ voucherTypes }) => {
    const { setModal } = useBoundStore((state) => state);
    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            {contextHolder}
            <div className="mt-[8px] flex w-full flex-col items-end space-y-5 rounded-[8px] bg-white p-[24px] text-center">
                <StaticBtn className="w-fit" onClick={() => setModal({ add: true })}>
                    Add Voucher Type
                </StaticBtn>
                <VoucherTypeTableListContainer data={voucherTypes} setIsLoading={setIsLoading} isLoading={isLoading} />
            </div>
            <AddVoucherTypeModalFormContainer />
            <EditVoucherTypeModalFormContainer />
        </>
    );
};

export default VoucherTypeContainer;
