import { cn } from '@/lib/utils';
import { Collapse, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

/**
 * A reusable accordion component based on Ant Design Collapse (accordion mode)
 * This component is specifically designed for accordion behavior where only one panel can be open at a time
 *
 * @param {Object} props - Component props
 * @param {String} props.className - Additional class names for the accordion
 * @param {Array} props.items - Panel items array with Ant Design panel structure
 * @param {String|Number} props.defaultActiveKey - Default active panel key (single key for accordion)
 * @param {String|Number} props.activeKey - Controlled active panel key (single key for accordion)
 * @param {Function} props.onChange - Callback when active panel changes
 * @param {Boolean} props.bordered - Whether to show border
 * @param {Boolean} props.destroyInactivePanel - Whether to destroy inactive panels
 * @param {String} props.expandIconPosition - Position of expand icon ('start' | 'end')
 * @param {Boolean} props.ghost - Whether to use ghost style
 * @param {String} props.size - Size of the accordion ('large' | 'middle' | 'small')
 * @param {Object} props.themeToken - Custom theme token for ConfigProvider
 * @param {Object} props.themeComponents - Custom components config for ConfigProvider
 * @param {String} props.collapsible - Whether panels can be collapsed ('header' | 'icon' | 'disabled')
 * @param {Function} props.expandIcon - Custom expand icon render function
 * @param {String} props.variant - Visual variant ('default' | 'filled' | 'borderless')
 */
const AccordionUI = ({
    className,
    items,
    defaultActiveKey,
    activeKey,
    onChange,
    bordered = true,
    destroyInactivePanel = false,
    expandIconPosition = 'start',
    ghost = false,
    size = 'middle',
    themeToken,
    themeComponents,
    collapsible = 'header',
    expandIcon,
    variant = 'default',
    ...props
}) => {
    // Default sample items for demonstration (only used if no items are provided)
    const internalItems = [
        {
            key: '1',
            label: 'Section 1: Getting Started',
            children: (
                <div className="space-y-2">
                    <p>Welcome to the accordion component! This section contains introductory information.</p>
                    <p>Only one section can be expanded at a time in accordion mode.</p>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Section 2: Features',
            children: (
                <div className="space-y-2">
                    <p>This accordion comes with many customizable features:</p>
                    <ul className="ml-4 list-inside list-disc space-y-1">
                        <li>Customizable themes and styling</li>
                        <li>Multiple size options</li>
                        <li>Icon positioning control</li>
                        <li>Ghost and bordered variants</li>
                    </ul>
                </div>
            ),
        },
        {
            key: '3',
            label: 'Section 3: Advanced Usage',
            children: (
                <div className="space-y-2">
                    <p>Advanced features include:</p>
                    <ul className="ml-4 list-inside list-disc space-y-1">
                        <li>Controlled and uncontrolled modes</li>
                        <li>Custom expand icons</li>
                        <li>Panel destruction options</li>
                        <li>Theme customization</li>
                    </ul>
                </div>
            ),
        },
        {
            key: '4',
            label: 'Section 4: Documentation',
            children: (
                <div className="space-y-2">
                    <p>For more detailed documentation, please refer to:</p>
                    <p className="text-blue-600">• Component API reference</p>
                    <p className="text-blue-600">• Usage examples</p>
                    <p className="text-blue-600">• Best practices guide</p>
                </div>
            ),
        },
    ];

    // Theme configuration based on variant
    const getThemeByVariant = () => {
        const baseTheme = {
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
                    headerPadding: '16px 20px',
                    contentPadding: '16px 20px',
                    fontSize: 14,
                    lineHeight: 1.5714285714285714,
                    ...themeComponents?.Collapse,
                },
                ...themeComponents,
            },
        };

        switch (variant) {
            case 'filled':
                return {
                    ...baseTheme,
                    components: {
                        ...baseTheme.components,
                        Collapse: {
                            ...baseTheme.components.Collapse,
                            headerBg: '#f0f0f0',
                            contentBg: '#f8f9fa',
                        },
                    },
                };
            case 'borderless':
                return {
                    ...baseTheme,
                    components: {
                        ...baseTheme.components,
                        Collapse: {
                            ...baseTheme.components.Collapse,
                            headerBg: 'transparent',
                            contentBg: 'transparent',
                        },
                    },
                };
            default:
                return baseTheme;
        }
    };

    const finalItems = items || internalItems;
    const theme = getThemeByVariant();

    return (
        <ConfigProvider theme={theme}>
            <Collapse
                className={cn('accordion-ui w-full', `accordion-${variant}`, className)}
                items={finalItems}
                defaultActiveKey={defaultActiveKey}
                activeKey={activeKey}
                onChange={onChange}
                accordion={true} // Force accordion mode
                bordered={variant !== 'borderless' && bordered}
                destroyInactivePanel={destroyInactivePanel}
                expandIconPosition={expandIconPosition}
                ghost={ghost || variant === 'borderless'}
                size={size}
                collapsible={collapsible}
                expandIcon={expandIcon}
                {...props}
            />
        </ConfigProvider>
    );
};

AccordionUI.propTypes = {
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
    defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    bordered: PropTypes.bool,
    destroyInactivePanel: PropTypes.bool,
    expandIconPosition: PropTypes.oneOf(['start', 'end']),
    ghost: PropTypes.bool,
    size: PropTypes.oneOf(['large', 'middle', 'small']),
    themeToken: PropTypes.object,
    themeComponents: PropTypes.object,
    collapsible: PropTypes.oneOf(['header', 'icon', 'disabled']),
    expandIcon: PropTypes.func,
    variant: PropTypes.oneOf(['default', 'filled', 'borderless']),
};

export default AccordionUI;
