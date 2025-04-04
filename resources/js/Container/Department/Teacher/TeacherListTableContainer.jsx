import TableUI from '@/Components/UI/TableUI';
import { usePage } from '@inertiajs/react';

const TeacherListTableContainer = () => {
    const { staff } = usePage().props;
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
    return <TableUI dataSource={staff} className="w-full" columns={Columns} />;
};

export default TeacherListTableContainer;
