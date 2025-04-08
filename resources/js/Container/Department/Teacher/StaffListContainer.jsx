import StaffListComponent from '@/Components/Department/Teacher/StaffListComponent';
import { useTeachersContext } from '@/contextApi&reducer/Department/TeacherContextApi';

const StaffListContainer = ({ staffs }) => {
    const { checkListDispatch, checkedList } = useTeachersContext();
    return <StaffListComponent data={staffs} handleCheckBox={handleCheckBox} checkedList={checkedList} />;
};

export default StaffListContainer;
