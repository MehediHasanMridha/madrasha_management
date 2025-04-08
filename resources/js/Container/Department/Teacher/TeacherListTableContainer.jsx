import Confirmpop from '@/Components/UI/Confirmpop';
import TableUI from '@/Components/UI/TableUI';
import Icons from '@/icons';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { router, usePage } from '@inertiajs/react';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';

const TeacherListTableContainer = ({ department }) => {
    const { staff } = usePage().props;
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState({
        id: null,
        open: false,
    });
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer); // Cleanup the timer on component unmount
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

    const handleOk = async (id) => {
        try {
            setConfirmLoading(true);
            router.delete(route('unassign.staff.store', { id, department_id: department.id }), {
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

    const Columns = [
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
            render: (text, record) => (
                <span className="flex items-center gap-x-5">
                    <Avatar src={getAvatarImage(record.image, 'staff_images', record.name)} size={60} />
                    {text}
                </span>
            ),
        },
        {
            title: "Father's Name",
            dataIndex: 'father_name',
            key: 'father_name',
        },
        {
            title: 'ID',
            dataIndex: 'unique_id',
            key: 'unique_id',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div className="flex gap-2">
                    <Confirmpop
                        key={record.id}
                        open={open.id === record.id && open.open}
                        handleOk={() => handleOk(record.id)}
                        handleCancel={handleCancel}
                        title="Are you sure You want to unassign this teacher?"
                        loading={confirmLoading}
                        description="This action will unassign the teacher."
                        okText="Unassign"
                        cancelText="Cancel"
                    >
                        <Icons name="delete" onClick={() => handleConfirm(record.id)} />
                    </Confirmpop>
                </div>
            ),
        },
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        router.get(
            route('department.view', {
                department_slug: department.slug,
                page: pagination.current,
                sort_field: sorter.field,
                order: sorter.order,
                per_page: pagination.pageSize,
                type: 'staff',
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
    };

    return <TableUI dataSource={staff} className="w-full" columns={Columns} onChange={handleTableChange} loading={loading} />;
};

export default TeacherListTableContainer;
