import AddFeeModal from '@/Components/SettingsComponent/Fee/AddFeeModal';
import EditFeeModal from '@/Components/SettingsComponent/Fee/EditFeeModal';
import FeeComponent from '@/Components/SettingsComponent/Fee/FeeComponent';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const FeeContainer = ({ fee = [] }) => {
    const [addFeeModal, setAddFeeModal] = useState(false);
    const [editFeeModal, setEditFeeModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const { manageFeeData, setManageFeeData } = useBoundStore((state) => state);
    if (manageFeeData?.category === null) {
        router.get(route('fee.fee_categories'));
    }
    return (
        <>
            <FeeComponent fee={fee} manageFeeData={manageFeeData} />

            {/* Modals */}
            {addFeeModal && <AddFeeModal open={addFeeModal} setOpen={setAddFeeModal} />}

            {editFeeModal && <EditFeeModal open={editFeeModal} setOpen={setEditFeeModal} editData={editData} />}
        </>
    );
};

export default FeeContainer;
