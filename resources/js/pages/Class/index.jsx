import StaticBtn from '@/Components/UI/StaticBtn';
import AddClassModalFormContainer from '@/Container/Class/AddClassModalFormContainer';
import ClassListTableContainer from '@/Container/Class/ClassListTableContainer';
import EditClassModalFormContainer from '@/Container/Class/EditClassModalFormContainer';
import SettingsLayout from '@/layouts/settings/layout';
import { useBoundStore } from '@/stores';
import { Head } from '@inertiajs/react';
import { notification } from 'antd';
import { RiUserAddLine } from 'react-icons/ri';

const ClassIndex = ({ classes, filters, departments, flash }) => {
    const { setModal } = useBoundStore((state) => state);
    const [api, contextHolder] = notification.useNotification();
    if (flash.error) {
        api.error({
            message: 'Error',
            description: flash.error,
            placement: 'bottomRight',
            duration: 3,
        });
    }

    return (
        <SettingsLayout>
            {contextHolder}
            <Head title="Classes" />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Class List</h1>
                <div className="mt-[8px] flex w-full flex-col items-end space-y-5 rounded-[8px] bg-white p-[24px] text-center">
                    <StaticBtn className="w-fit" onClick={() => setModal({ add: true })}>
                        <RiUserAddLine className="inline-flex" /> <span>Add Class</span>
                    </StaticBtn>
                    <ClassListTableContainer classes={classes} departments={departments} />
                </div>

                <AddClassModalFormContainer departments={departments} />
                <EditClassModalFormContainer departments={departments} />
            </div>
        </SettingsLayout>
    );
};

export default ClassIndex;
