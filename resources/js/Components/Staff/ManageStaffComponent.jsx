import StaticBtn from '@/Components/UI/StaticBtn';
import AddStaffModalFormContainer from '@/Container/Staff/AddStaffModalFormContainer';
import EditStaffModalFormContainer from '@/Container/Staff/EditStaffModalFormContainer';
import StaffSearchContainer from '@/Container/Staff/StaffSearchContainer';
import StaffTableListContainer from '@/Container/Staff/StaffTableListContainer';
import { RiUserAddLine } from 'react-icons/ri';

const ManageStaffComponent = ({ contextHolder, setIsModalOpen, isModalOpen, setIsLoading, staff, api }) => {
    return (
        <>
            {contextHolder}
            <div className="mt-[8px] flex w-full flex-col items-end space-y-5 rounded-[8px] bg-white p-[24px] text-center">
                <div className="flex w-full items-center justify-between space-x-[24px]">
                    <StaffSearchContainer />
                    <StaticBtn onClick={() => setIsModalOpen(true)}>
                        <RiUserAddLine className="inline-flex" /> <span>Add Staff</span>
                    </StaticBtn>
                </div>
                <StaffTableListContainer data={staff} setIsLoading={setIsLoading} />
                <EditStaffModalFormContainer />
            </div>
            <AddStaffModalFormContainer isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} api={api} />
        </>
    );
};

export default ManageStaffComponent;
