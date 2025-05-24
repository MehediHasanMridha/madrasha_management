import DropdownUI from '@/Components/UI/DropdownUI';
import { EllipsisOutlined } from '@ant-design/icons';
import { router } from '@inertiajs/react';
import { notification } from 'antd';

const DepartmentActionContainer = ({ data }) => {
    const themeComponents = {
        Dropdown: {
            paddingBlock: 6,
        },
    };

    const defaultThemeToken = {
        controlItemBgActive: '#e1e0e0',
        controlItemBgActiveHover: '#e1e0e0',
        colorPrimary: '#000',
    };

    const handleDelete = (data) => {
        if (confirm('Are you sure you want to delete this Campus?')) {
            router.delete(route('department.delete', { department_slug: data?.slug }), {
                preserveScroll: true,
                onSuccess: (res) => {
                    if (res?.props?.flash?.success) {
                        notification.success({
                            message: 'Success',
                            description: res?.props?.flash?.success,
                            placement: 'bottomRight',
                        });
                    }
                    if (res?.props?.flash?.error) {
                        notification.error({
                            message: 'Error',
                            description: res?.props?.flash?.error,
                            placement: 'bottomRight',
                        });
                    }
                },
                onError: (error) => {
                    console.error('Error deleting department:', error);
                },
            });
        }
    };

    const menuItems = [
        {
            label: 'Edit',
            key: 'edit',
            icon: '✏️',
            onClick: (e) => {
                // Handle edit action
                e.domEvent.stopPropagation();
                // setEditFeeModal(true);
                // setEditData(data);
            },
        },
        {
            label: 'Delete',
            key: 'delete',
            icon: <span>🗑️</span>,
            danger: true,
            onClick: (e) => {
                // Handle delete action
                // e.domEvent.stopPropagation();
                handleDelete(data);
            },
        },
    ];

    return (
        <DropdownUI
            BgActiveColor="#e1e0e0"
            items={menuItems}
            selectable={false}
            BgHover="#e1e0e0"
            themeComponents={themeComponents}
            trigger={['click']}
            themeToken={defaultThemeToken}
            placement="bottomRight"
        >
            <div onClick={(e) => e.stopPropagation()} className="flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-gray-100">
                <EllipsisOutlined className="text-lg" />
            </div>
        </DropdownUI>
    );
};

export default DepartmentActionContainer;
