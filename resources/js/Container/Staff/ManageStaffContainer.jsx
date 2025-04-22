import ManageStaffComponent from '@/Components/Staff/ManageStaffComponent';
import { StaffProvider } from '@/contextApi&reducer/Staff/StaffContextApi';
import { useDistricts } from '@/hooks/api/useDistricts';
import { useUpazillas } from '@/hooks/api/useUpazilla';
import { cn } from '@/lib/utils';
import { notification } from 'antd';
import { useState } from 'react';
import { FaUserGroup } from 'react-icons/fa6';
import SettingDropdownContainer from '../Shared/SettingDropdownContainer';

const ManageStaffContainer = ({ staff, filters, sortOrder }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { data: districts } = useDistricts();

    const [districtId, setDistrictId] = useState(null);
    const { data: upazillas } = useUpazillas(districtId);

    return (
        <StaffProvider
            value={{
                api,
                isModalOpen,
                setIsModalOpen,
                districts,
                districtId,
                upazillas,
                setDistrictId,
            }}
        >
            <div className="mt-[24px] flex w-full justify-between rounded-[8px] bg-white p-[24px]">
                <div className="flex space-x-[12px]">
                    <span
                        className={cn(
                            'flex w-fit cursor-pointer items-center space-x-[8px] border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]',
                        )}
                    >
                        <FaUserGroup className="inline-flex" size={24} />
                        <span className="text-[16px]">Staff</span>
                    </span>
                </div>
                <SettingDropdownContainer />
            </div>
            <ManageStaffComponent
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                contextHolder={contextHolder}
                staff={staff}
                filters={filters}
                sortOrder={sortOrder}
                api={api}
            />
        </StaffProvider>
    );
};

export default ManageStaffContainer;
