import Confirmpop from '@/Components/UI/Confirmpop';
import TableUI from '@/Components/UI/TableUI';
import Icons from '@/icons';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { router, usePage } from '@inertiajs/react';
import { Avatar } from 'antd';
import { useState } from 'react';

const TeacherListTableContainer = ({ department, isLoading, setIsLoading }) => {
    const { staffs } = usePage().props;
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
            dataIndex: ['guardian', 'father_name'],
            key: 'father_name',
        },
        {
            title: 'Phone',
            dataIndex: ['phone'],
            key: 'phone',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
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
            align: 'center',
            render: (text, record) => (
                <div className="flex justify-center gap-2">
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
            route('department.teachers_show', {
                department_slug: department.slug,
                page: pagination.current,
                sort_field: sorter.field,
                order: sorter.order,
                per_page: pagination.pageSize,
                filters: {
                    ...filters,
                },
            }),
            {},
            {
                onStart: () => {
                    setIsLoading(true);
                },
                preserveState: true,
                preserveScroll: true,
                onFinish: () => {
                    setIsLoading(false);
                },
                onError: (errors) => {
                    console.log('🚀 ~ handleTableChange ~ errors:', errors);
                    setIsLoading(false);
                },
            },
        );
    };

    return <TableUI data={staffs} className="w-full" columns={Columns} onChange={handleTableChange} showLoading={isLoading} />;
};

export default TeacherListTableContainer;
