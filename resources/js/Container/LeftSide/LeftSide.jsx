import Logo from '@/assets/images/logo.png';
import SideBarUI from '@/Components/UI/SideBarUI';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Calculator, ChartNoAxesCombined, PanelRight, School, Users } from 'lucide-react';
import { useState } from 'react';
const LeftSide = () => {
    const { departments } = usePage().props;
    const [collapsed, setCollapsed] = useState(false);
    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <SideBarUI
            collapsible={false}
            collapsed={collapsed}
            handleCollapsed={handleCollapsed}
            className={'sticky h-screen overflow-auto bg-white'}
            width={300}
            collapsedWidth={100}
            theme="light"
        >
            <SideBarUI.Item collapsed={collapsed} className="flex h-[80px] items-center space-x-[12px] px-[20px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={Logo} alt="logo" className="h-[33.16px] w-[32px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Madrasatul Hera</SideBarUI.Text>
            </SideBarUI.Item>
            <SideBarUI.Item
                onClick={handleCollapsed}
                collapsed={collapsed}
                className="flex h-[64px] cursor-pointer items-center space-x-[12px] px-[20px] hover:bg-[#F2F2F2]"
            >
                <SideBarUI.Icon className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#F2F2F2] p-1">
                    <PanelRight strokeWidth={1.5} size={20} className="text-[#4A4A4A]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Collapse</SideBarUI.Text>
            </SideBarUI.Item>
            <div className={cn('my-2 flex items-center space-x-[12px]', collapsed ? 'pl-0' : 'pl-[16px]')}>
                <SideBarUI.Text collapsed={collapsed}>Universal</SideBarUI.Text>
                <hr className="h-[0.5px] w-full bg-[#AFAFAF]" />
            </div>
            <Link href="/dashboard" as="button" className="w-full cursor-pointer">
                <SideBarUI.Item
                    collapsed={collapsed}
                    className={cn(
                        'flex h-[64px] items-center space-x-[12px] px-[20px] hover:bg-[#F2F2F2]',
                        route().current('dashboard') && 'w-full bg-[#F2F2F2]',
                    )}
                >
                    <SideBarUI.Icon className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#F2F2F2] p-1">
                        <ChartNoAxesCombined strokeWidth={1.5} size={20} className="text-[#4A4A4A]" />
                    </SideBarUI.Icon>
                    <SideBarUI.Text collapsed={collapsed}>Dashboard</SideBarUI.Text>
                </SideBarUI.Item>
            </Link>
            <Link href={route('finance.summary')} as="button" className="w-full cursor-pointer" preserveState preserveScroll>
                <SideBarUI.Item
                    collapsed={collapsed}
                    className={cn(
                        'flex h-[64px] items-center space-x-[12px] px-[20px] hover:bg-[#F2F2F2]',
                        route().current('finance.*') && 'w-full bg-[#F2F2F2]',
                    )}
                >
                    <SideBarUI.Icon className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#F2F2F2] p-1">
                        <Calculator strokeWidth={1.5} size={20} className="text-[#4A4A4A]" />
                    </SideBarUI.Icon>
                    <SideBarUI.Text collapsed={collapsed}>Finance</SideBarUI.Text>
                </SideBarUI.Item>
            </Link>
            <Link as="button" className="w-full cursor-pointer" href={route('staff.index')}>
                <SideBarUI.Item
                    collapsed={collapsed}
                    className={cn(
                        'flex h-[64px] items-center space-x-[12px] px-[20px] hover:bg-[#F2F2F2]',
                        route().current('staff.index') && 'bg-[#F2F2F2]',
                    )}
                >
                    <SideBarUI.Icon className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#F2F2F2] p-1">
                        <Users strokeWidth={1.5} size={20} className="text-[#4A4A4A]" />
                    </SideBarUI.Icon>
                    <SideBarUI.Text collapsed={collapsed}>Manage Staff </SideBarUI.Text>
                </SideBarUI.Item>
            </Link>
            <div className={cn('my-2 flex items-center space-x-[12px]', collapsed ? 'pl-0' : 'pl-[16px]')}>
                <SideBarUI.Text collapsed={collapsed}>Campus</SideBarUI.Text>
                <hr className="h-[0.5px] w-full bg-[#AFAFAF]" />
            </div>
            {departments?.map((department) => (
                <Link key={department.id} href={route('department.students_show', department.slug)} className="w-full cursor-pointer" as="button">
                    <SideBarUI.Item
                        collapsed={collapsed}
                        className={cn(
                            'flex h-[64px] items-center space-x-[8px] pl-[20px] hover:bg-[#F2F2F2]',
                            route().current('department.students_show', department.slug) && 'bg-[#F2F2F2]',
                        )}
                    >
                        <SideBarUI.Icon className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#F2F2F2] p-1">
                            <School strokeWidth={1.5} size={20} className="text-[#4A4A4A]" />
                        </SideBarUI.Icon>
                        <SideBarUI.Text className="w-full text-start" collapsed={collapsed}>
                            {department.name}
                        </SideBarUI.Text>
                    </SideBarUI.Item>
                </Link>
            ))}
            <div className={cn('my-2 flex items-center space-x-[12px]', collapsed ? 'pl-0' : 'pl-[24px]')}>
                <SideBarUI.Text collapsed={collapsed} className="w-[120px]">
                    Mobile app
                </SideBarUI.Text>
                <hr className="h-[0.5px] w-full bg-[#AFAFAF]" />
            </div>
            <SideBarUI.Item collapsed={collapsed} className="flex h-[64px] items-center space-x-[12px] px-[20px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={Logo} alt="Mobile app" className="h-[24px] w-[24px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Mobile app</SideBarUI.Text>
            </SideBarUI.Item>
        </SideBarUI>
    );
};

export default LeftSide;
