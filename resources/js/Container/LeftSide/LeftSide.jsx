import CollapseIcon from "@/assets/images/collapse.svg";
import Dashboard from "@/assets/images/dashboard.svg";
import Finance from "@/assets/images/finance.svg";
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
            className={"h-screen bg-white"}
            width={300}
            collapsedWidth={100}
        >
            <SideBarUI.Item
                collapsed={collapsed}
                className="flex h-[80px] items-center space-x-[12px] px-[50px]"
            >
                <SideBarUI.Icon>
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-[32px] h-[33.16px]"
                    />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>
                    Madrasatul Hera
                </SideBarUI.Text>
            </SideBarUI.Item>
            <SideBarUI.Item
                collapsed={collapsed}
                className="flex h-[80px] items-center space-x-[12px] px-[50px]"
            >
                <SideBarUI.Icon>
                    <img src={CollapseIcon} alt="CollapseIcon" />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Collapse</SideBarUI.Text>
            </SideBarUI.Item>
            <div
                className={`flex items-center space-x-[12px] my-2 ${
                    collapsed ? "pl-0" : "pl-[24px]"
                }`}
            >
                <SideBarUI.Text collapsed={collapsed}>
                    Statistics
                </SideBarUI.Text>
                <hr className="bg-[#AFAFAF] h-[0.5px] w-full" />
            </div>
            <SideBarUI.Item
                collapsed={collapsed}
                className="flex h-[80px] items-center space-x-[12px] px-[50px]"
            >
                <SideBarUI.Icon>
                    <img
                        src={Dashboard}
                        alt="Dashboard"
                        className="w-[24px] h-[24px]"
                    />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Dashboard</SideBarUI.Text>
            </SideBarUI.Item>
            <SideBarUI.Item
                collapsed={collapsed}
                className="flex h-[80px] items-center space-x-[12px] px-[50px]"
            >
                <SideBarUI.Icon>
                    <img
                        src={Finance}
                        alt="Finance"
                        className="w-[24px] h-[24px]"
                    />
                </SideBarUI.Icon>
                <SideBarUI.Text collapsed={collapsed}>Finance</SideBarUI.Text>
            </SideBarUI.Item>
            <div
                className={`flex items-center space-x-[12px] my-2 ${
                    collapsed ? "pl-0" : "pl-[24px]"
                }`}
            >
                <SideBarUI.Text collapsed={collapsed}>Campus</SideBarUI.Text>
                <hr className="bg-[#AFAFAF] h-[0.5px] w-full" />
            </div>
        </SideBarUI>
    );
};

export default LeftSide;
