import TableUI from '@/Components/UI/TableUI';
import Icons from '@/icons';
import { router } from '@inertiajs/react';
import { notification, Popconfirm } from 'antd';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import EditOperatorContainer from './EditOperatorContainer';
import { getStaffData } from './api/getStaffData';

const OperatorListTableContainer = ({ operators }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedOperator, setSelectedOperator] = useState(null);
    const { mutate } = getStaffData();

    const handleEdit = (operator) => {
        setSelectedOperator(operator);
        setEditModalOpen(true);
    };

    const handleDelete = (operatorId) => {
        router.delete(route('settings.operator.delete', { id: operatorId }), {
            onSuccess: () => {
                notification.success({
                    message: 'Success',
                    description: 'Operator deleted successfully',
                    placement: 'bottomRight',
                });
            },
            onError: (errors) => {
                const errorMessage = Object.values(errors).flat().join(', ') || 'Failed to delete operator';
                notification.error({
                    message: 'Error',
                    description: errorMessage,
                    placement: 'bottomRight',
                });
            },
            onFinish: () => {
                mutate(); // Refresh staff data after deletion
            },
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <span className="break-all">{text || 'N/A'}</span>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            render: (text, record) => (
                <span className="flex items-center justify-center">
                    <Icons name="edit" onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title="Are you sure you want to delete this operator?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                        placement="topRight"
                    >
                        <button className="ml-4 text-red-500 hover:text-red-600 hover:underline">
                            <Trash2 className="inline-block cursor-pointer" />
                        </button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    const data = operators.map((operator) => ({
        id: operator.id,
        key: operator.id,
        name: operator.name,
        email: operator.email,
        phone: operator.phone,
    }));

    return (
        <div className="mt-6">
            <TableUI columns={columns} data={{ data }} />

            {selectedOperator && (
                <EditOperatorContainer
                    isOpen={editModalOpen}
                    onClose={() => {
                        setEditModalOpen(false);
                        setSelectedOperator(null);
                    }}
                    operator={selectedOperator}
                />
            )}
        </div>
    );
};

export default OperatorListTableContainer;
