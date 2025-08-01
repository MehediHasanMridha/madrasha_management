import MenuUI from '@/Components/UI/MenuUI';
import StaticBtn from '@/Components/UI/StaticBtn';
import { PlusOutlined } from '@ant-design/icons';
import { router } from '@inertiajs/react';

const FeeTypeComponent = ({ fee = [], setAddFeeModal }) => {
    const handleEdit = (feeId) => {
        router.get(route('feeTypes.edit', feeId));
    };

    const handleDelete = (feeId) => {
        if (confirm('Are you sure you want to delete this fee?')) {
            router.delete(route('feeTypes.destroy', feeId));
        }
    };

    const getMenuItems = (feeId) => [
        {
            key: 'edit',
            label: 'Edit',
            onClick: () => handleEdit(feeId),
        },
        {
            key: 'delete',
            label: 'Delete',
            danger: true,
            onClick: () => handleDelete(feeId),
        },
    ];

    // Sample data for demonstration (replace with actual data)
    const sampleFees =
        fee?.data.length > 0
            ? fee?.data
            : [
                  { id: 1, name: 'Monthly fee' },
                  { id: 2, name: 'Exam fee' },
                  { id: 3, name: 'Session fee' },
              ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="mb-4 text-xl font-bold">Manage fee</h1>

            <div className="mb-4 border-b pb-2">
                <button className="text-sm font-semibold">All fees</button>
            </div>

            <div className="space-y-3">
                {sampleFees.map((fee) => (
                    <div key={fee.id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                        <span>{fee.name}</span>
                        <MenuUI items={getMenuItems(fee.id)} placement="bottomRight">
                            <button className="p-1" onClick={(e) => e.preventDefault()}>
                                <EllipsisOutlined className="text-lg" />
                            </button>
                        </MenuUI>
                    </div>
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

export default FeeTypeComponent;
