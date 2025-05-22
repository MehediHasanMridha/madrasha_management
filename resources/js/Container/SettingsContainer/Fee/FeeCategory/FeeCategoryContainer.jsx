import FeeCategoryComponent from '@/Components/SettingsComponent/Fee/FeeCategory/FeeCategoryComponent';
import { notification } from 'antd';
import { useState } from 'react';
import AddFeeCategoryModalFormContainer from './AddFeeCategoryModalFormContainer';
import EditFeeCategoryModalFormContainer from './EditFeeCategoryModalFormContainer';

const FeeCategoryContainer = ({ fee }) => {
    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const [addFeeModal, setAddFeeModal] = useState(false);
    const [editFeeModal, setEditFeeModal] = useState(false);
    const [editData, setEditData] = useState(null);

    return (
        <>
            {contextHolder}
            <FeeCategoryComponent fee={fee} setAddFeeModal={setAddFeeModal} setEditFeeModal={setEditFeeModal} setEditData={setEditData} />
            <AddFeeCategoryModalFormContainer addFeeModal={addFeeModal} setAddFeeModal={setAddFeeModal} />
            <EditFeeCategoryModalFormContainer editFeeModal={editFeeModal} setEditFeeModal={setEditFeeModal} data={editData} />
        </>
    );
};

export default FeeCategoryContainer;
