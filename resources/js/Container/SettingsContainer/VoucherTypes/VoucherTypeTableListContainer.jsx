import Confirmpop from '@/Components/UI/Confirmpop';
import TableUI from '@/Components/UI/TableUI';
import Icons from '@/icons';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const VoucherTypeTableListContainer = ({ data, setIsLoading, isLoading }) => {
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
            router.delete(route('settings.voucher-types.destroy', id), {
                onStart: () => {
                    setConfirmLoading(true);
                },
                onFinish: () => {
                    setConfirmLoading(false);
                    setOpen(false);
                },
            });
        } catch (error) {
            console.log('Error deleting voucher type:', error);
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
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
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
                        description="This action will delete the voucher type."
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
                    route('settings.voucher-types.index'),
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

export default VoucherTypeTableListContainer;
