import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { Avatar, Checkbox } from 'antd';

const StaffListComponent = ({ data, handleCheckBox, checkedList }) => {
    return (
        <div className="w-full space-y-10 border-b-[1px] border-b-[#E5E5E5] bg-[#F5F5F5] p-[16px]">
            <Checkbox.Group value={checkedList} onChange={handleCheckBox}>
                {data.map((item) => {
                    console.log('🚀 ~ {data.map ~ item:', item);
                    return (
                        <Checkbox key={item.id} value={item.id} className="w-full">
                            <span className="ml-5 space-x-5">
                                <span>
                                    <Avatar src={getAvatarImage(item.image, 'staff_images', item.name)} size={40} />
                                </span>
                                <span className="text-3xl">{item.name}</span>
                            </span>
                        </Checkbox>
                    );
                })}
            </Checkbox.Group>
        </div>
    );
};

export default StaffListComponent;
