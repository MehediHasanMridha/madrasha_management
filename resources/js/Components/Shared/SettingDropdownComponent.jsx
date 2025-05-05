import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { Link } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import Countdown from 'react-countdown';
import AvatarUI from '../UI/AvatarUI';
import DropdownUI from '../UI/DropdownUI';
import ProgressbarUI from '../UI/ProgressbarUI';

const SettingDropdownComponent = ({ items, user }) => {
    const calculateCountdownPercent = (endDate) => {
        const startDate = new Date();
        const totalDuration = new Date(endDate) - startDate;
        const elapsedDuration = totalDuration - (new Date(endDate) - new Date());
        return Math.max(0, Math.min(100, (elapsedDuration / totalDuration) * 100));
    };

    return (
        <div className="flex items-center">
            <DropdownUI
                placement="bottomRight"
                items={items}
                boxShadow={'none'}
                dropdownRender={(menu) => {
                    const endDate = new Date('2025-06-30');
                    const percent = calculateCountdownPercent(endDate);

                    return (
                        <div className="w-[400px] rounded-[8px] border border-[#E5E7EB] bg-white shadow-lg">
                            <div className="flex items-center border-b border-[#E5E7EB] px-[16px] py-[10px]">
                                <AvatarUI shape="square" size={40} src={getAvatarImage(user.image, 'staff_images', user.name)} />
                                <div className="ml-3">
                                    <p className="text-[16px] font-semibold">{user.name}</p>
                                    <p className="text-[14px] text-[#6B7280]">{user.email}</p>
                                </div>
                            </div>
                            <div className="mt-1 w-full border-b border-[#E5E7EB] bg-white px-[16px] py-[18px]">
                                <span className="flex items-center justify-between">
                                    <p>Renew in</p>
                                    <p className="text-[14px] font-medium text-[#00A606]">
                                        <Countdown
                                            date={endDate}
                                            renderer={({ days, hours, minutes, seconds }) => `${days}d ${hours}h ${minutes}m ${seconds}s`}
                                        />
                                    </p>
                                </span>
                                <ProgressbarUI
                                    percent={100 - percent}
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
                                className="flex w-full cursor-pointer space-x-3 border-t border-[#E5E7EB] px-[16px] py-[16px] hover:bg-[#F3F4F6]"
                            >
                                <LogOut strokeWidth={1.5} className="text-red-500" />
                                <span className="text-[14px] font-semibold text-red-500">Logout</span>
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
