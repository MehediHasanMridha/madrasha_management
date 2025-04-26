import ModalUI from '@/Components/UI/ModalUI';
import StaticBtn from '@/Components/UI/StaticBtn';
import InfiniteScrollContainer from '@/Container/Department/Teacher/InfiniteScrollContainer';
import TeacherListTableContainer from '@/Container/Department/Teacher/TeacherListTableContainer';
import TeacherSearchContainer from '@/Container/Department/Teacher/TeacherSearchContainer';
import { useTeachersContext } from '@/contextApi&reducer/Department/TeacherContextApi';

const TeacherSectionComponent = ({ handleClick, openModal, handleOk, handleCancel, department, isLoading, setIsLoading }) => {
    const { staffs } = useTeachersContext();
    return (
        <div className="mt-[8px] flex w-full flex-col items-end space-y-5 rounded-[8px] bg-white p-[24px] text-center">
            <div className="flex w-full items-center justify-between space-x-[24px]">
                <TeacherSearchContainer department={department} setIsLoading={setIsLoading} />
                <StaticBtn onClick={handleClick}>Assign Teacher</StaticBtn>
            </div>
            <TeacherListTableContainer department={department} isLoading={isLoading} setIsLoading={setIsLoading} />
            <ModalUI
                style={{ top: 80 }}
                title={<h1 className="text-[20px] font-semibold text-[#111827]">Assign Staff ({staffs?.meta.total}) </h1>}
                centered={false}
                isModalOpen={openModal}
                handleOk={handleOk}
                handleCancel={handleCancel}
                footer={
                    <div className="flex w-full items-center justify-end space-x-2">
                        <StaticBtn onClick={handleOk}>Assign Staff</StaticBtn>
                        <StaticBtn onClick={handleCancel} type="default">
                            Cancel
                        </StaticBtn>
                    </div>
                }
            >
                <InfiniteScrollContainer />
            </ModalUI>
        </div>
    );
};

export default TeacherSectionComponent;
