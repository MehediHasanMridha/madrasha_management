import Confirmpop from '@/Components/UI/Confirmpop';
import TableUI from '@/Components/UI/TableUI';
import Icons from '@/icons';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

const DepartmentTableListContainer = ({ data }) => {
    const { setModal, setPassData } = useBoundStore((state) => state);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState({
        id: null,
        open: false,
    });
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleConfirm = (id) => {
        setOpen({
            id,
            open: true,
        });
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = async (slug) => {
        try {
            setConfirmLoading(true);
            router.delete(route('department.delete', slug), {
                onStart: () => {
                    setConfirmLoading(true);
                },
                onSuccess: (res) => {
                    if (res?.props?.flash?.success) {
                        notification.success({
                            message: 'Success',
                            description: res?.props?.flash?.success,
                            placement: 'bottomRight',
                        });
                    }
                    if (res?.props?.flash?.error) {
                        notification.error({
                            message: 'Error',
                            description: res?.props?.flash?.error,
                            placement: 'bottomRight',
                        });
                    }
                },
                onFinish: () => {
                    setConfirmLoading(false);
                    setOpen(false);
                },
                onError: (errors) => {
                    console.log('🚀 ~ router.delete ~ errors:', errors);
                },
            });
        } catch (error) {
            console.log('Error deleting department:', error);
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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
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
                        handleOk={() => handleOk(record.slug)}
                        handleCancel={handleCancel}
                        title="Are you sure you want to delete?"
                        loading={confirmLoading}
                        description="This action will delete the department."
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
            data={data}
            columns={columns}
            className="w-full"
            onChange={(pagination, filters, sorter) => {
                router.get(
                    route('department'),
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
                            setLoading(true);
                        },
                        onFinish: () => {
                            setLoading(false);
                        },
                        onError: (errors) => {
                            console.log('Error in table change:', errors);
                            setLoading(false);
                        },
                    },
                );
            }}
            loading={loading}
            pagination={{
                pageSize: data?.per_page,
                showSizeChanger: true,
                total: data?.total,
                current: data?.current_page,
                pageSizeOptions: [5, 10, 20, 50, 100],
            }}
        />
    );
};

export default DepartmentTableListContainer;
