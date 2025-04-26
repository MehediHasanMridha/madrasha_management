import Confirmpop from '@/Components/UI/Confirmpop';
import TableUI from '@/Components/UI/TableUI';
import Icons from '@/icons';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { Avatar } from 'antd';
import { useState } from 'react';
import { FaFilter } from 'react-icons/fa6';

const StudentTableListContainer = ({ department, data, setIsLoading, isLoading }) => {
    const { setModal, setPassData } = useBoundStore((state) => state);
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
            dataIndex: ['guardian', 'father_name'],
            key: 'father_name',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' },
                { text: 'Other', value: 'other' },
            ],
            filterIcon: (filtered) => <FaFilter className={`text-xl ${filtered ? 'text-red-500' : ''}`} />,
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
            align: 'center',
            render: (text, record) => (
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
            dataSource={data}
            columns={columns}
            className="w-full"
            onChange={(pagination, filters, sorter) => {
                router.get(
                    route('department.students_show', {
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
                            setIsLoading(true);
                        },
                        onFinish: () => {
                            setIsLoading(false);
                        },
                        onError: (errors) => {
                            console.log('🚀 ~ handleTableChange ~ errors:', errors);
                            setIsLoading(false);
                        },
                    },
                );
            }}
            showLoading={isLoading}
        />
    );
};

export default StudentTableListContainer;
