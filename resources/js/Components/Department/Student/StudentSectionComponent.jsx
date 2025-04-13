import StaticBtn from '@/Components/UI/StaticBtn';
import AddStudentModalFormContainer from '@/Container/Department/Student/AddStudentModalFormContainer';
import EditStudentModalFormContainer from '@/Container/Department/Student/EditStudentModalFormContainer';
import StudentTableListContainer from '@/Container/Department/Student/StudentTableListContainer';
import { RiUserAddLine } from 'react-icons/ri';

const StudentSectionComponent = ({ contextHolder, department, students, setIsModalOpen, setIsLoading }) => {
    return (
        <>
            {contextHolder}
            <div className="mt-[8px] flex w-full flex-col items-end space-y-5 rounded-[8px] bg-white p-[24px] text-center">
                <StaticBtn onClick={() => setIsModalOpen(true)}>
                    <RiUserAddLine className="inline-flex" /> <span>Add Student</span>
                </StaticBtn>
                <StudentTableListContainer department={department} data={students} setIsLoading={setIsLoading} />
                <EditStudentModalFormContainer />
            </div>
            <AddStudentModalFormContainer />
        </>
    );
};

export default StudentSectionComponent;
