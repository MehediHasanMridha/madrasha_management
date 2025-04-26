import StaticBtn from '@/Components/UI/StaticBtn';
import AddStudentModalFormContainer from '@/Container/Department/Student/AddStudentModalFormContainer';
import EditStudentModalFormContainer from '@/Container/Department/Student/EditStudentModalFormContainer';
import StudentSearchContainer from '@/Container/Department/Student/StudentSearchContainer';
import StudentTableListContainer from '@/Container/Department/Student/StudentTableListContainer';
import { RiUserAddLine } from 'react-icons/ri';

const StudentSectionComponent = ({ contextHolder, department, students, setIsModalOpen, setIsLoading, isLoading }) => {
    return (
        <>
            {contextHolder}
            <div className="mt-[8px] flex w-full flex-col items-end space-y-5 rounded-[8px] bg-white p-[24px] text-center">
                <div className="flex w-full items-center justify-between space-x-[24px]">
                    <StudentSearchContainer department={department} setIsLoading={setIsLoading} />
                    <StaticBtn onClick={() => setIsModalOpen(true)}>
                        <RiUserAddLine className="inline-flex" /> <span>Add Student</span>
                    </StaticBtn>
                </div>
                <StudentTableListContainer department={department} data={students} setIsLoading={setIsLoading} isLoading={isLoading} />
                <EditStudentModalFormContainer />
            </div>
            <AddStudentModalFormContainer />
        </>
    );
};

export default StudentSectionComponent;
