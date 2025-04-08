import TableUI from '@/Components/UI/TableUI';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { router } from '@inertiajs/react';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';

const StaffTableListContainer = ({ data }) => {
    const [loading, setLoading] = useState(true);

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
                    <span className="cursor-pointer text-xl">Edit</span>
                    <span className="cursor-pointer text-xl text-red-500">Delete</span>
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
                        order: sorter?.order === 'ascend' ? 'asc' : sorter?.order === 'descend' ? 'desc' : undefined,
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
