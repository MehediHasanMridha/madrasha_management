import StaticBtn from '@/Components/UI/StaticBtn';
import { useBoundStore } from '@/stores';
import { notification } from 'antd';
import { useState } from 'react';
import { RiUserAddLine } from 'react-icons/ri';
import AddFeeTypeModalFormContainer from './AddFeeTypeModalFormContainer';
import EditFeeTypeModalFormContainer from './EditFeeTypeModalFormContainer';
import FeeTypeTableListContainer from './FeeTypeTableListContainer';

const FeeTypeContainer = ({ feeTypes }) => {
    const { setModal } = useBoundStore((state) => state);
    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            {contextHolder}
            <div className="mt-[8px] flex w-full flex-col items-end space-y-5 rounded-[8px] bg-white p-[24px] text-center">
                <StaticBtn className="w-fit" onClick={() => setModal({ add: true })}>
                    <RiUserAddLine className="inline-flex" /> <span>Add Fee Type</span>
                </StaticBtn>
                <FeeTypeTableListContainer data={feeTypes} setIsLoading={setIsLoading} isLoading={isLoading} />
            </div>
            <AddFeeTypeModalFormContainer />
            <EditFeeTypeModalFormContainer />
        </>
    );
};

export default FeeTypeContainer;
