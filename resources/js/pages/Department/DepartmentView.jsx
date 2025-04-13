import StaticBtn from '@/Components/UI/StaticBtn';
import AddDepartmentModalFormContainer from '@/Container/Department/AddDepartmentModalFormContainer';
import DepartmentTableListContainer from '@/Container/Department/DepartmentTableListContainer';
import EditDepartmentModalFormContainer from '@/Container/Department/EditDepartmentModalFormContainer';
import SettingsLayout from '@/layouts/settings/layout';
import { notification } from 'antd';
import { useState } from 'react';
import { RiUserAddLine } from 'react-icons/ri';

const DepartmentView = ({ departments, flash }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    if (flash.error) {
        api.error({
            message: 'Error',
            description: flash.error,
            placement: 'bottomRight',
            duration: 4,
        });
    }

    return (
        <SettingsLayout>
            {contextHolder}
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Department List</h1>
                <div className="mt-[8px] flex w-full flex-col items-end space-y-5 rounded-[8px] bg-white p-[24px] text-center">
                    <StaticBtn className="w-fit" onClick={() => setIsModalOpen(true)}>
                        <RiUserAddLine className="inline-flex" /> <span>Add Department</span>
                    </StaticBtn>
                    <DepartmentTableListContainer data={departments} />
                </div>
                <AddDepartmentModalFormContainer isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                <EditDepartmentModalFormContainer />
            </div>
        </SettingsLayout>
    );
};

export default DepartmentView;
