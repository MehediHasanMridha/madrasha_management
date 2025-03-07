import { useState } from 'react';
import { FaUserGroup } from 'react-icons/fa6';
import { RiUserAddLine } from 'react-icons/ri';
import FieldSet from '../../Components/UI/FieldSet';
import ModalUI from '../../Components/UI/ModalUI';
import StaticBtn from '../../Components/UI/StaticBtn';
import TableUI from '../../Components/UI/TableUI';
const DepartmentTabsSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="mt-[24px] rounded-[8px] bg-white p-[24px]">
                <span className="flex w-fit items-center space-x-[8px] border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]">
                    <FaUserGroup className="inline-flex" size={24} />
                    <span className="text-[16px]">Students</span>
                </span>
            </div>
            <div className="mt-[8px] flex w-full flex-col items-end space-y-5 rounded-[8px] bg-white p-[24px] text-center">
                <StaticBtn onClick={() => setIsModalOpen(true)}>
                    <RiUserAddLine className="inline-flex" /> <span>Add Student</span>
                </StaticBtn>
                <TableUI className="w-full" />
            </div>
            <ModalUI isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={'100%'} title="Add Student" style={{ top: 20 }}>
                <FieldSet label={'Personal Information'} labelClassName="text-[16px] font-[400]"></FieldSet>
            </ModalUI>
        </>
    );
};

export default DepartmentTabsSection;
