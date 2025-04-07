import TableUI from '@/Components/UI/TableUI';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { router, usePage } from '@inertiajs/react';
import { Avatar } from 'antd';
import { useState } from 'react';

const TeacherListTableContainer = ({ department }) => {
    const { staff } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
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
                sort: sorter.field,
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

    return <TableUI dataSource={staff} loading={isLoading} className="w-full" columns={Columns} onChange={handleTableChange} />;
};

export default TeacherListTableContainer;
