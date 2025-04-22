import { IoMenuOutline } from 'react-icons/io5';
import DropdownUI from '../UI/DropdownUI';

const SettingDropdownComponent = ({ items }) => {
    return (
        <div className="flex items-center">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-2xl bg-[#F6F6F6]">
                <DropdownUI
                    placement="bottomRight"
                    items={items}
                    boxShadow={'none'}
                    dropdownRender={(menu) => (
                        <>
                            <div className="mt-1 w-full bg-white px-[16px] py-[6px]">
                                <p>Renew in</p>
                                <div className="text-[16px] text-[#00A606]">22d 03h</div>
                            </div>
                            {menu}
                        </>
                    )}
                >
                    <IoMenuOutline className="cursor-pointer text-3xl" />
                </DropdownUI>
            </div>
        </div>
    );
};

export default SettingDropdownComponent;
