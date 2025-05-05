import { cn } from '@/lib/utils';
import { ConfigProvider, Dropdown } from 'antd';

const DropdownUI = ({
    className,
    arrow = false,
    children,
    items,
    trigger = ['click'],
    selectableFontColor,
    BgActiveColor,
    BgHover,
    selectable = true,
    boxShadow,
    ...props
}) => {
    const internalItems = [
        {
            label: <span>sdf</span>,
            key: '1',
            children: [
                {
                    label: '1st menu item',
                    key: '1-1',
                },
                {
                    label: '2nd menu item',
                    key: '1-2',
                },
            ],
            icon: <span>icon</span>,
        },
        {
            label: '2nd menu item',
            key: '2',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
        {
            label: '4rd menu item',
            key: '4',
            disabled: true,
        },
    ];
    return (
        <ConfigProvider
            theme={{
                token: {
                    controlItemBgActive: BgActiveColor || '#e6f4ff',
                    controlItemBgHover: BgHover || 'rgba(0,0,0,0.04)',
                    controlItemBgActiveHover: '#bae0ff',
                    colorPrimary: selectableFontColor || '#1677ff',
                    boxShadowSecondary:
                        boxShadow || '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
                },
                components: {
                    Dropdown: {
                        paddingBlock: 16,
                    },
                },
            }}
        >
            <Dropdown
                menu={{
                    items: items || internalItems,
                    // onClick,
                    selectable: { selectable },
                }}
                dropdownRender={(menu) => <>{menu}</>}
                arrow={arrow}
                trigger={trigger}
                className={cn(className)}
                overlayClassName="drop-shadow-lg bg-white rounded-lg"
                {...props}
            >
                {children}
            </Dropdown>
        </ConfigProvider>
    );
};

export default DropdownUI;
