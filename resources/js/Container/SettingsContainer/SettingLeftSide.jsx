import SideBarUI from '@/Components/UI/SideBarUI';
import Icons from '@/icons';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

const SettingLeftSide = () => {
    return (
        <SideBarUI theme="light" width={300} collapsible={false}>
            <span className="flex w-[300px] items-center gap-x-[12px] px-[32px] py-[26.5px] text-[18px] font-medium">
                <Link href={route('dashboard')}>
                    <Icons name={'back_btn'} />
                </Link>{' '}
                Settings
            </span>
            <div className="my-2 flex items-center space-x-[12px] pl-[24px]">
                <SideBarUI.Text className="text-[#AFAFAF]">Academics</SideBarUI.Text>
                <hr className="h-[0.5px] w-full bg-[#AFAFAF]" />
            </div>
            <SideBarUI.Item>
                <SideBarUI.Text
                    className={cn('w-full items-center px-[32px] py-[9px] hover:bg-[#F2F2F2]', { 'bg-[#F2F2F2]': route().current('department.*') })}
                >
                    <Link href={route('department.index')} as="button" className="cursor-pointer text-[16px] font-medium">
                        Manage Campus
                    </Link>{' '}
                    <br /> <span className="text-[#AFAFAF]">Add/Manage campus</span>
                </SideBarUI.Text>
            </SideBarUI.Item>
            <SideBarUI.Item>
                <SideBarUI.Text
                    className={cn('w-full items-center px-[32px] py-[9px] hover:bg-[#F2F2F2]', {
                        'bg-[#F2F2F2]': route().current('settings.voucher-types.*'),
                    })}
                >
                    <Link href={route('settings.voucher-types.index')} as="button" className="cursor-pointer text-[16px] font-medium">
                        Voucher Types
                    </Link>{' '}
                    <br /> <span className="text-[#AFAFAF]">Manage voucher types</span>
                </SideBarUI.Text>
            </SideBarUI.Item>
        </SideBarUI>
    );
};

export default SettingLeftSide;
