import TableUI from '@/Components/UI/TableUI';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { router } from '@inertiajs/react';
import { Avatar } from 'antd';
import { FaFilter } from 'react-icons/fa6';

const StudentTableListContainer = ({ department, data, filters, sortOrder, setIsLoading }) => {
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
            defaultSortOrder: sortOrder === 'undefined' ? undefined : sortOrder,
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
            filteredValue: filters.class_id,
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
                        page: pagination.current,
                        per_page: pagination.pageSize,
                        order: sorter.order,
                        sort_field: sorter.field,
                        filters: {
                            ...filters,
                        },
                    }),
                    {},
                    {
                        onStart: () => {
                            setIsLoading(true);
                        },
                    },
                );
            }}
        />
    );
};

export default StudentTableListContainer;
