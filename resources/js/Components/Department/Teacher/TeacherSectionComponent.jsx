import ModalUI from '@/Components/UI/ModalUI';
import StaticBtn from '@/Components/UI/StaticBtn';
import InfiniteScrollContainer from '@/Container/Department/Teacher/InfiniteScrollContainer';
import TeacherListTableContainer from '@/Container/Department/Teacher/TeacherListTableContainer';

const TeacherSectionComponent = ({ handleClick, openModal, handleOk, handleCancel }) => {
    return (
        <div className="mt-[8px] flex w-full flex-col items-end space-y-5 rounded-[8px] bg-white p-[24px] text-center">
            <StaticBtn onClick={handleClick}>Assign Teacher</StaticBtn>
            <TeacherListTableContainer />
            <ModalUI
                style={{ top: 80 }}
                title="Assign Teacher"
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
