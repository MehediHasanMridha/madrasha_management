import { cn } from '@/lib/utils';
import { ConfigProvider, Drawer, Layout } from 'antd';
import { useState } from 'react';

const SideBarUI = ({
    children,
    collapsible = true,
    collapsed,
    handleCollapsed,
    className = 'h-screen',
    width = 200,
    collapsedWidth = 100,
    drawerOpen,
    onDrawerClose,
    isMobile = false,
    ...props
}) => {
    const { Sider } = Layout;
    const [internalCollapsed, setInternalCollapsed] = useState(false);

    const onCollapse = () => {
        if (handleCollapsed) {
            handleCollapsed();
        }
        setInternalCollapsed(!internalCollapsed);
    };

    // On mobile, render as Drawer
    if (isMobile) {
        return (
            <ConfigProvider
                theme={{
                    token: {
                        paddingLG: 0,
                    },
                }}
            >
                <Drawer
                    placement="left"
                    onClose={onDrawerClose}
                    open={drawerOpen}
                    width={width}
                    bodyStyle={{ padding: 0 }}
                    headerStyle={{ display: 'none' }}
                    className="overflow-hidden bg-white p-0 transition-all duration-300"
                    {...props}
                >
                    <div className={cn('h-full bg-white', className)}>{children}</div>
                </Drawer>
            </ConfigProvider>
        );
    }

    // On desktop, render as Sider
    return (
        <Sider
            collapsible={collapsible}
            collapsed={collapsed !== undefined ? collapsed : internalCollapsed}
            onCollapse={onCollapse}
            width={width}
            className={cn('transition-all duration-300', className)}
            collapsedWidth={collapsedWidth}
            trigger={null}
            {...props}
        >
            {children}
        </Sider>
    );
};

const SideBarItemIcon = ({ children, collapsed, className = '', ...props }) => {
    return (
        <div className={cn('flex flex-shrink-0 items-center justify-center', className)} {...props}>
            {children}
        </div>
    );
};

const SideBarItemText = ({ children, className = '', collapsed, ...props }) => {
    return (
        <div
            className={cn(
                'overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out',
                !collapsed ? 'w-auto opacity-100' : 'w-0 opacity-0',
                className,
            )}
            {...props}
        >
            {!collapsed && children}
        </div>
    );
};

const SideBarItem = ({ children, className = '', collapsed, ...props }) => {
    return (
        <div
            {...props}
            className={cn(
                'flex cursor-pointer items-center p-4 transition-all duration-300 hover:bg-gray-100',
                !collapsed ? 'justify-start gap-4' : 'justify-center gap-0',
                className,
            )}
        >
            {children}
        </div>
    );
};

// Additional helper components
const SideBarGroup = ({ children, label, collapsed, className = '', divider = false, ...props }) => {
    return (
        <div className={cn('mb-4', className)} {...props}>
            {label && (
                <div
                    className={cn(
                        'overflow-hidden px-3 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase transition-all duration-300',
                        !collapsed ? 'h-auto opacity-100' : 'h-0 opacity-0',
                    )}
                >
                    {!collapsed && label}
                </div>
            )}
            <div className="space-y-1">{children}</div>
            {divider && <hr className="mt-2 border-gray-200" />}
        </div>
    );
};

const SideBarDivider = ({ className = '', ...props }) => {
    return (
        <div className={cn('my-4', className)} {...props}>
            <hr className="border-gray-200" />
        </div>
    );
};

SideBarUI.Icon = SideBarItemIcon;
SideBarUI.Text = SideBarItemText;
SideBarUI.Item = SideBarItem;
SideBarUI.Group = SideBarGroup;
SideBarUI.Divider = SideBarDivider;

export default SideBarUI;
