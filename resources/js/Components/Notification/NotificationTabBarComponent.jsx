import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { SendHorizontal } from 'lucide-react';
import { IoMdNotifications } from 'react-icons/io';

const NotificationTabBarComponent = ({ tab = 'notification' }) => {
    return (
        <div className="mt-[24px] flex w-full justify-between rounded-[8px] bg-white p-[24px]">
            <div className="flex space-x-[12px]">
                <Link
                    href={route('notifications.index')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px] px-[8px] py-[6px] text-gray-500',
                        tab === 'notification' ? 'border-b-[1px] border-[#4891FF] text-[#4891FF]' : '',
                    )}
                    as="button"
                >
                    <IoMdNotifications className="inline-flex" size={24} />
                    <span className="text-[16px]">Send Notification</span>
                </Link>
                <Link
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px] px-[8px] py-[6px] text-gray-500',
                        tab === 'sms' ? 'border-b-[1px] border-[#4891FF] text-[#4891FF]' : '',
                    )}
                    href={route('notifications.sms-section')}
                    as="button"
                >
                    <SendHorizontal className="inline-flex" size={24} />
                    <span className="text-[16px]">SMS</span>
                </Link>
            </div>
        </div>
    );
};

export default NotificationTabBarComponent;
