import Logo from '@/assets/images/logo.png';
import SideBarUI from '@/Components/UI/SideBarUI';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Calculator, ChartNoAxesCombined, FilePenLine, PanelRight, School, Users } from 'lucide-react';
import { useState } from 'react';

const LeftSide = ({ drawerOpen, onDrawerClose, isMobile }) => {
    const { departments } = usePage().props;
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleLinkClick = () => {
        // Close drawer on mobile when a link is clicked
        if (isMobile && onDrawerClose) {
            onDrawerClose();
        }
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
            drawerOpen={drawerOpen}
            onDrawerClose={onDrawerClose}
            isMobile={isMobile}
        >
            {/* Header with logo */}
            <SideBarUI.Item collapsed={collapsed} className="h-[80px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={Logo} alt="logo" className="h-[33.16px] w-[32px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed} className="text-lg font-semibold">
                    Madrasatul Hera
                </SideBarUI.Text>
            </SideBarUI.Item>

            {/* Collapse toggle button - only show on desktop */}
            {!isMobile && (
                <SideBarUI.Item onClick={handleCollapsed} collapsed={collapsed} className="h-[64px] hover:bg-[#F2F2F2]">
                    <SideBarUI.Icon className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#F2F2F2] p-1">
                        <PanelRight strokeWidth={1.5} size={20} className="text-[#4A4A4A]" />
                    </SideBarUI.Icon>
                    <SideBarUI.Text collapsed={collapsed}>Collapse</SideBarUI.Text>
                </SideBarUI.Item>
            )}

            {/* Universal Section */}
            <SideBarUI.Group label="Universal" collapsed={collapsed} divider />
            <Link href="/dashboard" prefetch as="button" className="w-full cursor-pointer" onClick={handleLinkClick}>
                <SideBarUI.Item
                    collapsed={collapsed}
                    className={cn('h-[64px] hover:bg-[#F2F2F2]', route().current('dashboard') && 'w-full bg-[#F2F2F2]')}
                >
                    <SideBarUI.Icon className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#F2F2F2] p-1">
                        <ChartNoAxesCombined strokeWidth={1.5} size={20} className="text-[#4A4A4A]" />
                    </SideBarUI.Icon>
                    <SideBarUI.Text collapsed={collapsed}>Dashboard</SideBarUI.Text>
                </SideBarUI.Item>
            </Link>
            <Link
                href={route('finance.summary')}
                as="button"
                className="w-full cursor-pointer"
                preserveState
                preserveScroll
                prefetch
                onClick={handleLinkClick}
            >
                <SideBarUI.Item
                    collapsed={collapsed}
                    className={cn('h-[64px] hover:bg-[#F2F2F2]', route().current('finance.*') && 'w-full bg-[#F2F2F2]')}
                >
                    <SideBarUI.Icon className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#F2F2F2] p-1">
                        <Calculator strokeWidth={1.5} size={20} className="text-[#4A4A4A]" />
                    </SideBarUI.Icon>
                    <SideBarUI.Text collapsed={collapsed}>Finance</SideBarUI.Text>
                </SideBarUI.Item>
            </Link>
            <Link as="button" className="w-full cursor-pointer" href={route('staff.index')} onClick={handleLinkClick}>
                <SideBarUI.Item collapsed={collapsed} className={cn('h-[64px] hover:bg-[#F2F2F2]', route().current('staff.index') && 'bg-[#F2F2F2]')}>
                    <SideBarUI.Icon className="h-[32px] w-[32px] rounded-[8px] bg-[#F2F2F2]">
                        <Users strokeWidth={1.5} size={20} className="text-[#4A4A4A]" />
                    </SideBarUI.Icon>
                    <SideBarUI.Text collapsed={collapsed}>Manage Staff </SideBarUI.Text>
                </SideBarUI.Item>
            </Link>
            {/* Campus Section */}
            <SideBarUI.Group label="Campus" divider collapsed={collapsed} />
            {departments?.map((department) => (
                <Link
                    key={department.id}
                    href={route('department.students_show', department.slug)}
                    className="w-full cursor-pointer"
                    as="button"
                    onClick={handleLinkClick}
                >
                    <SideBarUI.Item
                        collapsed={collapsed}
                        className={cn('h-[64px] hover:bg-[#F2F2F2]', route().current('department.*', department.slug) && 'bg-[#F2F2F2]')}
                    >
                        <SideBarUI.Icon className="h-[32px] w-[32px] rounded-[8px] bg-[#F2F2F2]">
                            <School strokeWidth={1.5} size={20} className="text-[#4A4A4A]" />
                        </SideBarUI.Icon>
                        <SideBarUI.Text collapsed={collapsed}>{department.name}</SideBarUI.Text>
                    </SideBarUI.Item>
                </Link>
            ))}
            {/* Mobile App Section */}
            <SideBarUI.Group label="Publications" collapsed={collapsed} divider />
            <Link href={route('blogs.index')} className="w-full cursor-pointer" as="button">
                <SideBarUI.Item collapsed={collapsed} className={cn('h-[64px] hover:bg-[#F2F2F2]', route().current('blogs.*') && 'bg-[#F2F2F2]')}>
                    <SideBarUI.Icon>
                        <FilePenLine strokeWidth={1.5} size={20} className="text-[#4A4A4A]" />
                    </SideBarUI.Icon>
                    <SideBarUI.Text collapsed={collapsed}>Manage Blogs</SideBarUI.Text>
                </SideBarUI.Item>
            </Link>
            <SideBarUI.Item collapsed={collapsed} className="h-[64px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={Logo} alt="Mobile app" className="h-[24px] w-[24px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Mobile app</SideBarUI.Text>
            </SideBarUI.Item>
        </SideBarUI>
    );
};

export default LeftSide;
