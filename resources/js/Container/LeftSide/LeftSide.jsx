import Logo from "@/assets/images/logo.png";
import SideBarUI from "@/Components/SideBarUI";
import { Layout } from "antd";
import { useState } from "react";

import CollapseIcon from "@/assets/images/collapse.svg";

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
        </SideBarUI>
    );
};

export default LeftSide;
