import { Layout } from "antd";
import { useState } from "react";
const SideBarUI = ({
    children,
    collapsible,
    collapsed,
    handleCollapsed,
    className,
    width,
    collapsedWidth,
}) => {
    const { Sider } = Layout;
    const [internalCollapsed, setInternalCollapsed] = useState(false);
    const onCollapse = () => {
        if (handleCollapsed) {
            handleCollapsed();
        }
        setInternalCollapsed(!internalCollapsed);
    };
    return (
        <Sider
            collapsible={collapsible !== undefined ? collapsible : true}
            collapsed={collapsed !== undefined ? collapsed : internalCollapsed}
            onCollapse={onCollapse}
            width={width !== undefined ? width : 200}
            className={className !== undefined ? className : "h-screen"}
            collapsedWidth={collapsedWidth !== undefined ? collapsedWidth : 100}
        >
            {children}
        </Sider>
    );
};

export default SideBarUI;
