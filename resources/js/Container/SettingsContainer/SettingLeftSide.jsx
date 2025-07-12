import SideBarUI from '@/Components/UI/SideBarUI';
import Icons from '@/icons';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

const SettingLeftSide = () => {
    return (
        <SideBarUI theme="light" width={300} collapsible={false} className={'sticky h-screen overflow-auto bg-white'}>
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
            <Link
                href={route('settings.branding.index')}
                prefetch
                as="button"
                className={cn('w-[300px] cursor-pointer items-center text-start text-[16px] font-medium', {
                    'bg-[#F2F2F2]': route().current('settings.branding.*'),
                })}
            >
                <SideBarUI.Item>
                    <SideBarUI.Text>
                        Branding
                        <br /> <span className="font-normal text-[#AFAFAF]">Manage branding</span>
                    </SideBarUI.Text>
                </SideBarUI.Item>
            </Link>
            <Link
                href={route('settings.welcome_page_index')}
                prefetch
                as="button"
                className={cn('w-[300px] cursor-pointer items-center text-start text-[16px] font-medium', {
                    'bg-[#F2F2F2]': route().current('settings.welcome-page.*'),
                })}
            >
                <SideBarUI.Item>
                    <SideBarUI.Text>
                        Welcome Page
                        <br /> <span className="font-normal text-[#AFAFAF]">Customize welcome page content</span>
                    </SideBarUI.Text>
                </SideBarUI.Item>
            </Link>
            <Link
                href={route('department.index')}
                prefetch
                as="button"
                className={cn('w-[300px] cursor-pointer items-center text-start text-[16px] font-medium', {
                    'bg-[#F2F2F2]': route().current('department.*'),
                })}
            >
                <SideBarUI.Item>
                    <SideBarUI.Text>
                        Manage Campus <br /> <span className="font-normal text-[#AFAFAF]">Add/Manage campus</span>
                    </SideBarUI.Text>
                </SideBarUI.Item>
            </Link>
            <Link
                href={route('settings.voucher-types.index')}
                prefetch
                as="button"
                className={cn('w-[300px] cursor-pointer items-center text-start text-[16px] font-medium', {
                    'bg-[#F2F2F2]': route().current('settings.voucher-types.*'),
                })}
            >
                <SideBarUI.Item>
                    <SideBarUI.Text>
                        Voucher Types <br /> <span className="font-normal text-[#AFAFAF]">Manage voucher types</span>
                    </SideBarUI.Text>
                </SideBarUI.Item>
            </Link>
        </SideBarUI>
    );
};

export default SettingLeftSide;
