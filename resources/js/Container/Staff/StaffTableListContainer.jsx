import Confirmpop from '@/Components/UI/Confirmpop';
import TableUI from '@/Components/UI/TableUI';
import Icons from '@/icons';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { router } from '@inertiajs/react';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';

const StaffTableListContainer = ({ data }) => {
    const [loading, setLoading] = useState(true);
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
            router.delete(route('user.delete', id), {
                onStart: () => {
                    setConfirmLoading(true);
                },
                onFinish: () => {
                    setConfirmLoading(false);
                    setOpen(false);
                },
            });
        } catch (error) {
            console.log('🚀 ~ handleOk ~ error:', error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            hidden: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            render: (text, record) => {
                return (
                    <span className="flex items-center gap-x-5">
                        <Avatar src={getAvatarImage(record.image, 'staff_images', record.name)} size={60} />
                        {text}
                    </span>
                );
            },
        },
        {
            title: "Father's Name",
            dataIndex: 'father_name',
            key: 'father_name',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div className="flex gap-2">
                    <Icons name="edit" />
                    <Confirmpop
                        key={record.id}
                        open={open.id === record.id && open.open}
                        handleOk={() => handleOk(record.id)}
                        handleCancel={handleCancel}
                        title="Are you sure You want to delete?"
                        loading={confirmLoading}
                        description="This action will delete the student."
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
            dataSource={data}
            className="w-full"
            onChange={(pagination, filters, sorter) => {
                router.get(
                    route('staff.index', {
                        page: pagination.current,
                        per_page: pagination.pageSize,
                        sort_field: sorter?.field,
                        order: sorter?.order,
                        filters: {
                            ...filters,
                        },
                    }),
                    {},
                    {
                        onStart: () => {
                            setLoading(true);
                        },
                        preserveState: true,
                        preserveScroll: true,
                        onFinish: () => {
                            setLoading(false);
                        },
                        onError: (errors) => {
                            console.log('🚀 ~ handleTableChange ~ errors:', errors);
                            setLoading(false);
                        },
                    },
                );
            }}
            loading={loading}
        />
    );
};

export default StaffTableListContainer;
