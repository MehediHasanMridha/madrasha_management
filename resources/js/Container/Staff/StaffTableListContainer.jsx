import Confirmpop from '@/Components/UI/Confirmpop';
import TableUI from '@/Components/UI/TableUI';
import Icons from '@/icons';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { useBoundStore } from '@/stores';
import { router, usePage } from '@inertiajs/react';
import { Avatar } from 'antd';
import { useState } from 'react';

const StaffTableListContainer = ({ data, setIsLoading, isLoading }) => {
    const { setModal, setPassData } = useBoundStore((state) => state);
    const [open, setOpen] = useState({
        id: null,
        open: false,
    });
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { auth } = usePage().props;

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
            router.delete(route('staff.delete', id), {
                onStart: () => {
                    setConfirmLoading(true);
                },
                onFinish: () => {
                    setConfirmLoading(false);
                    setOpen(false);
                },
            });
        } catch (error) {
            console.log('Error deleting staff:', error);
        }
    };

    const columns = [
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
                    <Icons
                        name="edit"
                        onClick={() => {
                            setModal({ edit: true });
                            setPassData(record);
                        }}
                    />
                    {auth.permissions.viewAny && (
                        <Confirmpop
                            key={record.id}
                            open={open.id === record.id && open.open}
                            handleOk={() => handleOk(record.id)}
                            handleCancel={handleCancel}
                            title="Are you sure You want to delete?"
                            loading={confirmLoading}
                            description="This action will delete the staff member."
                            okText="Delete"
                            cancelText="Cancel"
                        >
                            <Icons name="delete" onClick={() => handleConfirm(record.id)} />
                        </Confirmpop>
                    )}
                </div>
            ),
        },
    ];

    return (
        <TableUI
            columns={columns}
            data={data}
            className="w-full"
            onChange={(pagination, filters, sorter) => {
                router.get(
                    route('staff.index'),
                    {
                        page: pagination.current,
                        per_page: pagination.pageSize,
                        order: sorter.order,
                        sort_field: sorter.field,
                        filters,
                    },
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
                            console.log('Error in table change:', errors);
                            setIsLoading(false);
                        },
                    },
                );
            }}
            showLoading={isLoading}
        />
    );
};

export default StaffTableListContainer;
