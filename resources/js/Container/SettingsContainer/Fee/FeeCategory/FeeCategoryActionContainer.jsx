import DropdownUI from '@/Components/UI/DropdownUI';
import { EllipsisOutlined } from '@ant-design/icons';
import { router } from '@inertiajs/react';

const FeeCategoryActionContainer = ({ data, setEditFeeModal, setEditData }) => {
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
        if (confirm('Are you sure you want to delete this fee?')) {
            router.delete(route('fee_delete_category', data?.id));
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
                setEditFeeModal(true);
                setEditData(data);
            },
        },
        {
            label: 'Delete',
            key: 'delete',
            icon: <span>🗑️</span>,
            danger: true,
            onClick: (e) => {
                // Handle delete action
                e.domEvent.stopPropagation();
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

export default FeeCategoryActionContainer;
