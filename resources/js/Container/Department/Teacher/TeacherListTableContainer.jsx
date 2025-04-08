import TableUI from '@/Components/UI/TableUI';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { router, usePage } from '@inertiajs/react';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';

const TeacherListTableContainer = ({ department }) => {
    const { staff } = usePage().props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);
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
                    <span className="cursor-pointer text-xl">Edit</span>
                    <span className="cursor-pointer text-xl text-red-500">Delete</span>
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
