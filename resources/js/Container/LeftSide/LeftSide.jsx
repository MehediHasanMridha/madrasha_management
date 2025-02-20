import Logo from "@/assets/images/logo.png";
import SideBarUI from "@/Components/SideBarUI";
import { Layout } from "antd";
import { useState } from "react";
const LeftSide = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { Sider } = Layout;
    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <SideBarUI
            collapsed={collapsed}
            handleCollapsed={handleCollapsed}
            className={"h-screen bg-gray-200"}
            width={300}
            collapsedWidth={100}
        >
            <div className="flex h-[80px] justify-center items-center space-x-[12px]">
                <img src={Logo} alt="logo" className="w-[32px] h-[33.16px]" />
                {!collapsed && (
                    <div className="text-[#131313] text-lg font-medium transition delay-1000 duration-1000 ease-in-out">
                        Madrasatul Hera
                    </div>
                )}
            </div>
        </SideBarUI>
    );
};

export default LeftSide;
