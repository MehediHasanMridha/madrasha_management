import TableUI from '@/Components/UI/TableUI';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { router } from '@inertiajs/react';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa6';

const StudentTableListContainer = ({ department, data }) => {
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
            render: (text, record) => (
                <span className="flex items-center gap-x-5">
                    <Avatar src={getAvatarImage(record.image, 'student_images', record.name)} size={60} />
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
            title: 'Class',
            dataIndex: 'class',
            key: 'class_id',
            filters: department.classes.map((item) => ({
                text: item.name,
                value: item.id,
            })),
            filterIcon: (filtered) => <FaFilter className={`text-xl ${filtered ? 'text-red-500' : ''}`} />,
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
    return (
        <TableUI
            dataSource={data}
            columns={columns}
            className="w-full"
            onChange={(pagination, filters, sorter) => {
                router.get(
                    route('department.view', {
                        department_slug: department.slug,
                        s_page: pagination.current,
                        s_per_page: pagination.pageSize,
                        s_order: sorter.order,
                        s_sort_field: sorter.field,
                        filters: {
                            ...filters,
                        },
                    }),
                    {},
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

export default StudentTableListContainer;
