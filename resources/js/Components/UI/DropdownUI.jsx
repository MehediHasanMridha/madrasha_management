import { cn } from '@/lib/utils';
import { ConfigProvider, Dropdown } from 'antd';
import PropTypes from 'prop-types';

/**
 * A reusable dropdown component based on Ant Design
 *
 * @param {Object} props - Component props
 * @param {String} props.className - Additional class names for the dropdown
 * @param {Boolean} props.arrow - Whether the dropdown has an arrow
 * @param {Node} props.children - The dropdown trigger element
 * @param {Array} props.items - Menu items array with Ant Design menu item structure
 * @param {Array|String} props.trigger - Dropdown trigger type(s) ['hover', 'click', 'contextMenu']
 * @param {String} props.selectableFontColor - Color for selected item text
 * @param {String} props.BgActiveColor - Background color for active item
 * @param {String} props.BgHover - Background color for hover state
 * @param {Boolean} props.selectable - Whether menu items are selectable
 * @param {String} props.boxShadow - Custom box shadow for the dropdown
 * @param {String} props.placement - Dropdown placement ('bottomLeft', 'bottomRight', 'topLeft', 'topRight', etc.)
 * @param {Function} props.onSelect - Callback when an item is selected
 * @param {Boolean} props.disabled - Whether the dropdown is disabled
 * @param {Object} props.themeToken - Custom theme token for ConfigProvider
 * @param {Object} props.themeComponents - Custom components config for ConfigProvider
 */
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
    placement = 'bottomLeft',
    onSelect,
    disabled = false,
    themeToken,
    themeComponents,
    ...props
}) => {
    // Default sample items for demonstration (only used if no items are provided)
    const internalItems = [
        {
            label: 'Menu Group',
            key: 'group',
            children: [
                {
                    label: 'Submenu Item 1',
                    key: 'submenu-1',
                },
                {
                    label: 'Submenu Item 2',
                    key: 'submenu-2',
                },
            ],
            icon: <span>📁</span>,
        },
        {
            label: 'Regular Item',
            key: 'regular',
        },
        {
            label: 'Primary Item',
            key: 'primary',
            type: 'primary',
        },
        {
            type: 'divider',
        },
        {
            label: 'Disabled Item',
            key: 'disabled',
            disabled: true,
        },
    ];
    // Handle menu item selection
    const handleMenuClick = (e) => {
        if (onSelect) {
            onSelect(e);
        }
    };

    // Default theme token and components
    const defaultThemeToken = {
        controlItemBgActive: BgActiveColor || '#e6f4ff',
        controlItemBgHover: BgHover || 'rgba(0,0,0,0.04)',
        controlItemBgActiveHover: '#bae0ff',
        colorPrimary: selectableFontColor || '#1677ff',
        boxShadowSecondary: boxShadow || '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    };

    const defaultThemeComponents = {
        Dropdown: {
            paddingBlock: 16,
        },
    };

    return (
        <ConfigProvider
            theme={{
                token: themeToken ? { ...defaultThemeToken, ...themeToken } : defaultThemeToken,
                components: themeComponents ? { ...defaultThemeComponents, ...themeComponents } : defaultThemeComponents,
            }}
        >
            <Dropdown
                menu={{
                    items: items || internalItems,
                    onClick: handleMenuClick,
                    selectable,
                }}
                dropdownRender={(menu) => <>{menu}</>}
                arrow={arrow}
                trigger={Array.isArray(trigger) ? trigger : [trigger]}
                className={cn(className)}
                overlayClassName="drop-shadow-lg bg-white rounded-lg"
                placement={placement}
                disabled={disabled}
                {...props}
            >
                {children}
            </Dropdown>
        </ConfigProvider>
    );
};

// PropTypes for better documentation and type checking
DropdownUI.propTypes = {
    className: PropTypes.string,
    arrow: PropTypes.bool,
    children: PropTypes.node.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
            children: PropTypes.array,
            icon: PropTypes.node,
            disabled: PropTypes.bool,
            danger: PropTypes.bool,
            type: PropTypes.string,
        }),
    ),
    trigger: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'contextMenu'])),
        PropTypes.oneOf(['click', 'hover', 'contextMenu']),
    ]),
    selectableFontColor: PropTypes.string,
    BgActiveColor: PropTypes.string,
    BgHover: PropTypes.string,
    selectable: PropTypes.bool,
    boxShadow: PropTypes.string,
    placement: PropTypes.oneOf(['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight', 'top', 'bottom', 'left', 'right']),
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    themeToken: PropTypes.object,
    themeComponents: PropTypes.object,
};

export default DropdownUI;
