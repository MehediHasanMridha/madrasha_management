import StaffListComponent from '@/Components/Department/Teacher/StaffListComponent';
import { useTeachersContext } from '@/contextApi&reducer/Department/TeacherContextApi';
import { usePage } from '@inertiajs/react';

const StaffListContainer = ({ staffs }) => {
    const { checkListDispatch, checkedList } = useTeachersContext();
    const { staff: assign_staff } = usePage().props;
    const handleCheckBox = (list) => {
        checkListDispatch({ type: 'setCheckedList', list });
    };
    return <StaffListComponent staffs={staffs} assign_staff={assign_staff?.data} handleCheckBox={handleCheckBox} checkedList={checkedList} />;
};

export default StaffListContainer;
