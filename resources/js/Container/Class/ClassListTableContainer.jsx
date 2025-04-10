import Confirmpop from '@/Components/UI/Confirmpop';
import TableUI from '@/Components/UI/TableUI';
import Icons from '@/icons';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const ClassListTableContainer = ({ classes, departments }) => {
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

    const handleDelete = async (slug) => {
        try {
            setConfirmLoading(true);
            router.delete(route('class.delete', slug), {
                onStart: () => {
                    setConfirmLoading(true);
                },
                onFinish: () => {
                    setConfirmLoading(false);
                    setOpen(false);
                },
            });
        } catch (error) {
            console.log('Error deleting class:', error);
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
            title: 'Department',
            dataIndex: ['department', 'name'],
            key: 'department',
        },
        {
            title: 'Description',
            dataIndex: 'des',
            key: 'des',
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
                        handleOk={() => handleDelete(record.slug)}
                        handleCancel={handleCancel}
                        title="Are you sure you want to delete?"
                        loading={confirmLoading}
                        description="This action will delete the class."
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
            dataSource={classes}
            columns={columns}
            className="w-full"
            onChange={(pagination, filters, sorter) => {
                router.get(
                    route('class'),
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
        />
    );
};

export default ClassListTableContainer;
