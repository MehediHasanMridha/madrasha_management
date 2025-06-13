import DropdownUI from '@/Components/UI/DropdownUI';
import { useDepartmentStore } from '@/stores';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { EllipsisVertical } from 'lucide-react';

const ExamActionContainer = ({ data }) => {
    const { modal, setModal } = useDepartmentStore((state) => state);
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
        if (confirm('Are you sure you want to delete this exam?')) {
            router.delete(route('department.exams.delete', { exam: data?.id }), {
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
                    console.error('Error deleting exam:', error);
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
                e.domEvent.stopPropagation();
                setModal({ editExam: true, data });
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
            <div className="flex h-[40px] w-[40px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[6px] bg-white transition-colors hover:border hover:border-[#0267FF] hover:bg-gray-50">
                <div className="flex items-center justify-center">
                    <EllipsisVertical className="h-[24px] w-[24px] text-lg" />
                </div>
            </div>
        </DropdownUI>
    );
};

export default ExamActionContainer;
