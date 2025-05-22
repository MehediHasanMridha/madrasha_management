import StaticBtn from '@/Components/UI/StaticBtn';
import FeeCategoryActionContainer from '@/Container/SettingsContainer/Fee/FeeCategory/FeeCategoryActionContainer';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from '@inertiajs/react';

const FeeCategoryComponent = ({ fee = [], setAddFeeModal, setEditFeeModal, setEditData }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="mb-4 text-xl font-bold">Manage fee</h1>

            <div className="mb-4 border-b pb-2">
                <button className="text-sm font-semibold">All fees</button>
            </div>

            <div className="space-y-3">
                {fee?.data?.map((fee) => (
                    <Link
                        as="button"
                        key={fee.id}
                        className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow-sm"
                        href={route('fee.fee_index')}
                    >
                        <span>{fee.name}</span>
                        <FeeCategoryActionContainer data={fee} setEditFeeModal={setEditFeeModal} setEditData={setEditData} />
                    </Link>
                ))}

                <StaticBtn
                    onClick={() => setAddFeeModal(true)}
                    className="flex w-full items-center gap-2 rounded-lg bg-gray-100 p-4 text-gray-500 shadow-sm"
                >
                    <PlusOutlined /> Add new fee Category
                </StaticBtn>
            </div>
        </div>
    );
};

export default FeeCategoryComponent;
