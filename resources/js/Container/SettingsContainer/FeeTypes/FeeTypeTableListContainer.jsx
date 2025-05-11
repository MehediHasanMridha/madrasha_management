import Confirmpop from '@/Components/UI/Confirmpop';
import TableUI from '@/Components/UI/TableUI';
import Icons from '@/icons';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';

const FeeTypeTableListContainer = ({ data, setIsLoading, isLoading }) => {
    const { setModal, setPassData } = useBoundStore((state) => state);
    const [open, setOpen] = useState({
        id: null,
        open: false,
    });
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleConfirm = (id) => {
        setOpen({
            id,
            open: true,
        });
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = async (id) => {
        try {
            setConfirmLoading(true);
            router.delete(route('settings.fee-types.destroy', id), {
                onStart: () => {
                    setConfirmLoading(true);
                },
                onSuccess: (res) => {
                    if (res.props.flash.success) {
                        notification.success({
                            message: 'Success',
                            description: res.props.flash.success,
                            placement: 'bottomRight',
                        });
                    }
                    if (res.props.flash.error) {
                        notification.error({
                            message: 'Error',
                            description: res.props.flash.error,
                            placement: 'bottomRight',
                        });
                    }
                },
                onFinish: () => {
                    setConfirmLoading(false);
                    setOpen(false);
                },
            });
        } catch (error) {
            console.log('Error deleting fee type:', error);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: 'Default Amount',
            dataIndex: 'default_amount',
            key: 'default_amount',
            render: (text) => (text ? `${text} TK` : 'N/A'),
        },
        // {
        //     title: 'Variable',
        //     dataIndex: 'is_variable',
        //     key: 'is_variable',
        //     render: (value) => (value ? 'Yes' : 'No'),
        // },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <div className="flex justify-center gap-2">
                    <Icons
                        name="edit"
                        onClick={() => {
                            setModal({ edit: true });
                            setPassData(record);
                        }}
                    />
                    <Confirmpop
                        key={record.id}
                        open={open.id === record.id && open.open}
                        handleOk={() => handleOk(record.id)}
                        handleCancel={handleCancel}
                        title="Are you sure you want to delete?"
                        loading={confirmLoading}
                        description="This action will delete the fee type."
                        okText="Delete"
                        cancelText="Cancel"
                    >
                        <Icons name="delete" onClick={() => handleConfirm(record.id)} />
                    </Confirmpop>
                </div>
            ),
        },
    ];

    return (
        <TableUI
            columns={columns}
            data={data}
            className="w-full"
            onChange={(pagination, filters, sorter) => {
                router.get(
                    route('settings.fee-types.index'),
                    {
                        page: pagination.current,
                        per_page: pagination.pageSize,
                        order: sorter.order,
                        sort_field: sorter.field,
                        filters,
                    },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        onStart: () => {
                            setIsLoading(true);
                        },
                        onFinish: () => {
                            setIsLoading(false);
                        },
                        onError: (errors) => {
                            console.log('Error in table change:', errors);
                            setIsLoading(false);
                        },
                    },
                );
            }}
            showLoading={isLoading}
        />
    );
};

export default FeeTypeTableListContainer;
