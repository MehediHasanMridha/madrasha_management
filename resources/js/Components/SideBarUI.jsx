import { Layout } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";

const SideBarUI = ({
    children,
    collapsible = true,
    collapsed,
    handleCollapsed,
    className = "h-screen",
    width = 200,
    collapsedWidth = 100,
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
            collapsible={collapsible}
            collapsed={collapsed !== undefined ? collapsed : internalCollapsed}
            onCollapse={onCollapse}
            width={width}
            className={className}
            collapsedWidth={collapsedWidth}
        >
            {children}
        </Sider>
    );
};

const SideBarItemIcon = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};

const SideBarItemText = ({ children, className = "", collapsed, ...props }) => {
    return (
        !collapsed && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={className}
                {...props}
            >
                {children}
            </motion.div>
        )
    );
};

const SideBarItem = ({ children, className = "", collapsed }) => (
    <div
        className={`flex items-center ${
            collapsed ? "justify-center h-[80px]" : className
        }`}
    >
        {children}
    </div>
);

SideBarUI.Icon = SideBarItemIcon;
SideBarUI.Text = SideBarItemText;
SideBarUI.Item = SideBarItem;

export default SideBarUI;
