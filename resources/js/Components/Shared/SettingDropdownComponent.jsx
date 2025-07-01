import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { Link } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import Countdown from 'react-countdown';
import AvatarUI from '../UI/AvatarUI';
import DropdownUI from '../UI/DropdownUI';
import ProgressbarUI from '../UI/ProgressbarUI';

const SettingDropdownComponent = ({ items, user }) => {
    const calculateCountdownPercent = (date1, date2) => {
        const startDate = new Date(date1);
        const endDate = new Date(date2);
        const totalDuration = endDate - startDate;
        const currentDuration = endDate - new Date();
        return Math.ceil((currentDuration / totalDuration) * 100);
    };

    return (
        <div className="flex items-center">
            <DropdownUI
                placement="bottomRight"
                items={items}
                boxShadow={'none'}
                dropdownRender={(menu) => {
                    const startDate = new Date('2025-06-30');
                    const endDate = new Date('2025-12-31');
                    const percent = calculateCountdownPercent(startDate, endDate);
                    return (
                        <div className="w-[300px] rounded-[8px] border border-[#E5E7EB] bg-white shadow-lg sm:w-[400px]">
                            <div className="flex items-center border-b border-[#E5E7EB] px-3 py-[10px] sm:px-[16px]">
                                <AvatarUI shape="square" size={40} src={getAvatarImage(user.image, 'staff_images', user.name)} />
                                <div className="ml-3 min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold sm:text-[16px]">{user.name}</p>
                                    <p className="truncate text-xs text-[#6B7280] sm:text-[14px]">{user.email}</p>
                                </div>
                            </div>
                            <div className="mt-1 w-full border-b border-[#E5E7EB] bg-white px-3 py-[18px] sm:px-[16px]">
                                <span className="flex items-center justify-between">
                                    <p className="text-sm">Renew in</p>
                                    <p className="text-xs font-medium text-[#00A606] sm:text-[14px]">
                                        <Countdown
                                            date={endDate}
                                            renderer={({ days, hours, minutes, seconds }) => `${days}d ${hours}h ${minutes}m ${seconds}s`}
                                        />
                                    </p>
                                </span>
                                <ProgressbarUI
                                    percent={percent}
                                    strokeWidth={6}
                                    type="line"
                                    color={{ '0%': '#dc143c', '5%': '#ffd700', '100%': '#00A606' }}
                                />
                            </div>
                            {menu}
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex w-full cursor-pointer space-x-3 border-t border-[#E5E7EB] px-3 py-[16px] hover:bg-[#F3F4F6] sm:px-[16px]"
                            >
                                <LogOut strokeWidth={1.5} className="text-red-500" />
                                <span className="text-xs font-semibold text-red-500 sm:text-[14px]">Logout</span>
                            </Link>
                        </div>
                    );
                }}
            >
                <AvatarUI shape="square" size={40} src={getAvatarImage(user.image, 'staff_images', user.name)} />
            </DropdownUI>
        </div>
    );
};

export default SettingDropdownComponent;
