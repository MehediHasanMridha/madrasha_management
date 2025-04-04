import { Checkbox } from 'antd';

const StaffListComponent = ({ staffs, handleCheckBox, checkedList, assign_staff }) => {
    // Filter out staffs that are already assigned
    const unassignedStaffs = staffs.filter((staff) => {
        return !assign_staff.some((assignedStaff) => assignedStaff.id === staff.id);
    });

    return unassignedStaffs.map((item, index) => (
        <div key={item.id} className="flex w-full items-center justify-between space-x-2 border-b-[1px] border-b-[#E5E5E5] bg-[#F5F5F5] p-[16px]">
            <Checkbox.Group
                value={checkedList}
                options={[{ label: item.name + ' ' + item.id, value: item.id }]}
                className="w-full cursor-pointer"
                onChange={(list) => handleCheckBox(list)}
            >
                {item.name}
                {item.id}
            </Checkbox.Group>
        </div>
    ));
};

export default StaffListComponent;
