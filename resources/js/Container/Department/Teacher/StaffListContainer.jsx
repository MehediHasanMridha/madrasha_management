import StaffListComponent from '@/Components/Department/Teacher/StaffListComponent';
import { useTeachersContext } from '@/contextApi&reducer/Department/TeacherContextApi';
import { usePage } from '@inertiajs/react';

const StaffListContainer = ({ staffs }) => {
    const { checkListDispatch, checkedList } = useTeachersContext();
    const { staff: assign_staff } = usePage().props;
    const handleCheckBox = (list) => {
        checkListDispatch({ type: 'setCheckedList', list });
    };
    const unassignedStaffs = staffs.filter((staff) => {
        return !assign_staff.data.some((assignedStaff) => assignedStaff.id === staff.id);
    });
    return <StaffListComponent data={unassignedStaffs} handleCheckBox={handleCheckBox} checkedList={checkedList} />;
};

export default StaffListContainer;
