import { cn } from '@/lib/utils';
import { ConfigProvider, Switch } from 'antd';
import PropTypes from 'prop-types';

/**
 * A reusable toggle switch component based on Ant Design Switch
 * This component provides a customizable toggle switch with consistent styling
 *
 * @param {Object} props - Component props
 * @param {String} props.className - Additional class names for the switch
 * @param {Boolean} props.checked - Whether the switch is checked (controlled)
 * @param {Boolean} props.defaultChecked - Default checked state (uncontrolled)
 * @param {Function} props.onChange - Callback when switch state changes (checked, event)
 * @param {Boolean} props.disabled - Whether the switch is disabled
 * @param {Boolean} props.loading - Whether to show loading indicator
 * @param {String} props.size - Size of the switch ('default' | 'small')
 * @param {String|ReactNode} props.checkedChildren - Content shown when checked
 * @param {String|ReactNode} props.unCheckedChildren - Content shown when unchecked
 * @param {String} props.variant - Visual variant ('default' | 'outline')
 * @param {Object} props.themeToken - Custom theme token for ConfigProvider
 * @param {Object} props.themeComponents - Custom components config for ConfigProvider
 * @param {Boolean} props.autoFocus - Whether to focus automatically
 * @param {String} props.id - HTML id attribute
 * @param {String} props.title - HTML title attribute for accessibility
 */
const ToggleUI = ({
    className,
    checked,
    defaultChecked,
    onChange,
    disabled = false,
    loading = false,
    size = 'default',
    checkedChildren,
    unCheckedChildren,
    variant = 'default',
    themeToken,
    themeComponents,
    autoFocus = false,
    id,
    title,
    ...props
}) => {
    // Default theme configuration
    const defaultThemeConfig = {
        components: {
            Switch: {
                colorPrimary: '#1AA2A2',
                colorPrimaryHover: '#16a085',
                colorPrimaryBorder: '#1AA2A2',
                handleBg: '#ffffff',
                handleShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
                trackPadding: 2,
                ...(themeComponents?.Switch || {}),
            },
        },
        token: {
            borderRadius: 20,
            fontSize: 14,
            ...themeToken,
        },
    };

    // Variant-specific styling
    const variantClasses = {
        default: '',
        outline: 'ant-switch-outline',
    };

    return (
        <ConfigProvider theme={defaultThemeConfig}>
            <Switch
                id={id}
                title={title}
                className={cn(
                    'transition-all duration-200 ease-in-out',
                    'focus:ring-opacity-50 focus:ring-2 focus:ring-[#1AA2A2]',
                    'hover:shadow-sm',
                    variantClasses[variant],
                    className,
                )}
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={onChange}
                disabled={disabled}
                loading={loading}
                size={size}
                checkedChildren={checkedChildren}
                unCheckedChildren={unCheckedChildren}
                autoFocus={autoFocus}
                {...props}
            />
        </ConfigProvider>
    );
};

// PropTypes for development-time type checking
ToggleUI.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'small']),
    checkedChildren: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    unCheckedChildren: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    variant: PropTypes.oneOf(['default', 'outline']),
    themeToken: PropTypes.object,
    themeComponents: PropTypes.object,
    autoFocus: PropTypes.bool,
    id: PropTypes.string,
    title: PropTypes.string,
};

export default ToggleUI;
