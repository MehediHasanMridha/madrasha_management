import CollapseIcon from '@/assets/images/collapse.svg';
import Dashboard from '@/assets/images/dashboard.svg';
import Finance from '@/assets/images/finance.svg';
import hifjo_bivag from '@/assets/images/hifjo_bivag.svg';
import Islamic_School from '@/assets/images/islamic_school.svg';
import kitab_bivag from '@/assets/images/kitab_bivag.svg';
import Logo from '@/assets/images/logo.png';
import logout from '@/assets/images/logout.svg';
import madani from '@/assets/images/madani.svg';
import setting from '@/assets/images/setting.svg';
import SideBarUI from '@/Components/SideBarUI';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

const LeftSide = () => {
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
            <SideBarUI.Item collapsed={collapsed} className="flex h-[80px] items-center space-x-[12px] px-[50px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={Logo} alt="logo" className="h-[33.16px] w-[32px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Madrasatul Hera</SideBarUI.Text>
            </SideBarUI.Item>
            <SideBarUI.Item collapsed={collapsed} className="flex h-[64px] items-center space-x-[12px] px-[50px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon onClick={handleCollapsed} className="cursor-pointer">
                    <img src={CollapseIcon} alt="CollapseIcon" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Collapse</SideBarUI.Text>
            </SideBarUI.Item>
            <div className={`my-2 flex items-center space-x-[12px] ${collapsed ? 'pl-0' : 'pl-[24px]'}`}>
                <SideBarUI.Text collapsed={collapsed}>Statistics</SideBarUI.Text>
                <hr className="h-[0.5px] w-full bg-[#AFAFAF]" />
            </div>
            <Link href="/dashboard">
                <SideBarUI.Item
                    collapsed={collapsed}
                    className={`flex h-[64px] items-center space-x-[12px] px-[50px] hover:bg-[#F2F2F2] ${
                        route().current('dashboard') ? 'w-full bg-[#F2F2F2]' : ''
                    }`}
                >
                    <SideBarUI.Icon>
                        <img src={Dashboard} alt="Dashboard" className="h-[24px] w-[24px]" />
                    </SideBarUI.Icon>
                    <SideBarUI.Text collapsed={collapsed}>Dashboard</SideBarUI.Text>
                </SideBarUI.Item>
            </Link>
            <SideBarUI.Item collapsed={collapsed} className="flex h-[64px] items-center space-x-[12px] px-[50px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={Finance} alt="Finance" className="h-[24px] w-[24px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Finance</SideBarUI.Text>
            </SideBarUI.Item>
            <div className={`my-2 flex items-center space-x-[12px] ${collapsed ? 'pl-0' : 'pl-[24px]'}`}>
                <SideBarUI.Text collapsed={collapsed}>Campus</SideBarUI.Text>
                <hr className="h-[0.5px] w-full bg-[#AFAFAF]" />
            </div>
            <SideBarUI.Item collapsed={collapsed} className="flex h-[64px] items-center space-x-[12px] px-[50px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={Islamic_School} alt="Islamic_School}" className="h-[24px] w-[24px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Islamic School</SideBarUI.Text>
            </SideBarUI.Item>
            <SideBarUI.Item collapsed={collapsed} className="flex h-[64px] items-center space-x-[12px] px-[50px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={hifjo_bivag} alt="Hifjo Bivag" className="h-[24px] w-[24px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Hifjo Bivag</SideBarUI.Text>
            </SideBarUI.Item>
            <SideBarUI.Item collapsed={collapsed} className="flex h-[64px] items-center space-x-[12px] px-[50px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={kitab_bivag} alt="kitab_bivag" className="h-[24px] w-[24px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Kitab Bivag</SideBarUI.Text>
            </SideBarUI.Item>
            <SideBarUI.Item collapsed={collapsed} className="flex h-[64px] items-center space-x-[12px] px-[50px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={madani} alt="madani" className="h-[24px] w-[24px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Madani nesab</SideBarUI.Text>
            </SideBarUI.Item>
            <div className={`my-2 flex items-center space-x-[12px] ${collapsed ? 'pl-0' : 'pl-[24px]'}`}>
                <SideBarUI.Text collapsed={collapsed} className="w-[120px]">
                    Mobile app
                </SideBarUI.Text>
                <hr className="h-[0.5px] w-full bg-[#AFAFAF]" />
            </div>
            <SideBarUI.Item collapsed={collapsed} className="flex h-[64px] items-center space-x-[12px] px-[50px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={Logo} alt="Mobile app" className="h-[24px] w-[24px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Mobile app</SideBarUI.Text>
            </SideBarUI.Item>
            <div className={`my-2 flex items-center space-x-[12px] ${collapsed ? 'pl-0' : 'pl-[24px]'}`}>
                <SideBarUI.Text collapsed={collapsed}>System</SideBarUI.Text>
                <hr className="h-[0.5px] w-full bg-[#AFAFAF]" />
            </div>
            <SideBarUI.Item collapsed={collapsed} className="flex h-[64px] items-center space-x-[12px] px-[50px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={setting} alt="Setting" className="h-[24px] w-[24px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Setting</SideBarUI.Text>
            </SideBarUI.Item>
            <SideBarUI.Item collapsed={collapsed} className="mt-[180px] flex h-[64px] items-center space-x-[12px] px-[50px] hover:bg-[#F2F2F2]">
                <SideBarUI.Icon>
                    <img src={logout} alt="Log out" className="h-[24px] w-[24px]" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed} className="text-red-500">
                    Log out
                </SideBarUI.Text>
            </SideBarUI.Item>
        </SideBarUI>
    );
};

export default LeftSide;
