import { cn } from '@/lib/utils';
import { Collapse, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

/**
 * A reusable collapse/accordion component based on Ant Design
 *
 * @param {Object} props - Component props
 * @param {String} props.className - Additional class names for the collapse
 * @param {Array} props.items - Panel items array with Ant Design panel structure
 * @param {String|Array} props.defaultActiveKey - Default active panel key(s)
 * @param {String|Array} props.activeKey - Controlled active panel key(s)
 * @param {Function} props.onChange - Callback when active panels change
 * @param {Boolean} props.accordion - Whether to use accordion mode (only one panel open at a time)
 * @param {Boolean} props.bordered - Whether to show border
 * @param {Boolean} props.destroyInactivePanel - Whether to destroy inactive panels
 * @param {Boolean} props.expandIconPosition - Position of expand icon ('start' | 'end')
 * @param {Boolean} props.ghost - Whether to use ghost style
 * @param {String} props.size - Size of the collapse ('large' | 'middle' | 'small')
 * @param {Object} props.themeToken - Custom theme token for ConfigProvider
 * @param {Object} props.themeComponents - Custom components config for ConfigProvider
 * @param {Boolean} props.collapsible - Whether panels can be collapsed ('header' | 'icon' | 'disabled')
 * @param {Function} props.expandIcon - Custom expand icon render function
 */
const CollapseUI = ({
    className,
    items,
    defaultActiveKey,
    activeKey,
    onChange,
    accordion = false,
    bordered = true,
    destroyInactivePanel = false,
    expandIconPosition = 'start',
    ghost = false,
    size = 'middle',
    themeToken,
    themeComponents,
    collapsible = 'header',
    expandIcon,
    ...props
}) => {
    // Default sample items for demonstration (only used if no items are provided)
    const internalItems = [
        {
            key: '1',
            label: 'Panel Header 1',
            children: (
                <div>
                    <p>This is the content of panel 1.</p>
                    <p>You can put any React component here.</p>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Panel Header 2',
            children: (
                <div>
                    <p>This is the content of panel 2.</p>
                    <p>Each panel can have different content.</p>
                </div>
            ),
        },
        {
            key: '3',
            label: 'Panel Header 3',
            children: (
                <div>
                    <p>This is the content of panel 3.</p>
                    <p>Panels can be controlled or uncontrolled.</p>
                </div>
            ),
            disabled: false,
        },
    ];

    // Default theme configuration
    const defaultTheme = {
        token: {
            borderRadiusLG: 8,
            colorBorder: '#d9d9d9',
            colorFillAlter: '#fafafa',
            ...themeToken,
        },
        components: {
            Collapse: {
                headerBg: '#fafafa',
                contentBg: '#ffffff',
                headerPadding: '12px 16px',
                contentPadding: '16px',
                fontSize: 14,
                lineHeight: 1.5714285714285714,
                ...themeComponents?.Collapse,
            },
            ...themeComponents,
        },
    };

    const finalItems = items || internalItems;

    return (
        <ConfigProvider theme={defaultTheme}>
            <Collapse
                className={cn('w-full', className)}
                items={finalItems}
                defaultActiveKey={defaultActiveKey}
                activeKey={activeKey}
                onChange={onChange}
                accordion={accordion}
                bordered={bordered}
                destroyInactivePanel={destroyInactivePanel}
                expandIconPosition={expandIconPosition}
                ghost={ghost}
                size={size}
                collapsible={collapsible}
                expandIcon={expandIcon}
                {...props}
            />
        </ConfigProvider>
    );
};

CollapseUI.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.node.isRequired,
            children: PropTypes.node,
            disabled: PropTypes.bool,
            collapsible: PropTypes.oneOf(['header', 'icon', 'disabled']),
            extra: PropTypes.node,
            forceRender: PropTypes.bool,
            showArrow: PropTypes.bool,
        }),
    ),
    defaultActiveKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ]),
    activeKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ]),
    onChange: PropTypes.func,
    accordion: PropTypes.bool,
    bordered: PropTypes.bool,
    destroyInactivePanel: PropTypes.bool,
    expandIconPosition: PropTypes.oneOf(['start', 'end']),
    ghost: PropTypes.bool,
    size: PropTypes.oneOf(['large', 'middle', 'small']),
    themeToken: PropTypes.object,
    themeComponents: PropTypes.object,
    collapsible: PropTypes.oneOf(['header', 'icon', 'disabled']),
    expandIcon: PropTypes.func,
};

export default CollapseUI;
