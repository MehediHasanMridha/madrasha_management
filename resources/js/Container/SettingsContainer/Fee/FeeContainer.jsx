import AddFeeModal from '@/Components/SettingsComponent/Fee/AddFeeModal';
import EditFeeModal from '@/Components/SettingsComponent/Fee/EditFeeModal';
import FeeComponent from '@/Components/SettingsComponent/Fee/FeeComponent';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

const FeeContainer = ({ fee = [] }) => {
    const [addFeeModal, setAddFeeModal] = useState(false);
    const [editFeeModal, setEditFeeModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const { departments } = usePage().props;

    return (
        <>
            <FeeComponent
                fee={fee}
                setAddFeeModal={setAddFeeModal}
                setEditFeeModal={setEditFeeModal}
                setEditData={setEditData}
                departments={departments}
            />

            {/* Modals */}
            {addFeeModal && <AddFeeModal open={addFeeModal} setOpen={setAddFeeModal} />}

            {editFeeModal && <EditFeeModal open={editFeeModal} setOpen={setEditFeeModal} editData={editData} />}
        </>
    );
};

export default FeeContainer;
