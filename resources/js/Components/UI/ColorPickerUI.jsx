import { cn } from '@/lib/utils';
import { ColorPicker, ConfigProvider } from 'antd';

const ColorPickerUI = ({
    value,
    className,
    size = 'middle',
    format = 'hex',
    showText = false,
    allowClear = false,
    disabled = false,
    theme = {},
    onChange,
    ...props
}) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    ColorPicker: {
                        colorPrimary: '#1AA2A2',
                        colorPrimaryHover: '#1AA2A2',
                        colorPrimaryActive: '#1AA2A2',
                        borderColorDisabled: '#AFAFAF',
                    },
                },
                token: {
                    colorBorder: '#AFAFAF',
                    borderRadius: 8,
                    colorBorderHover: '#1AA2A2',
                    colorPrimary: '#1AA2A2',
                    colorPrimaryHover: '#1AA2A2',
                    colorPrimaryActive: '#1AA2A2',
                    ...theme.token, // Allow overriding theme tokens
                },
                ...theme, // Allow overriding the entire theme
            }}
        >
            <ColorPicker
                className={cn(
                    'rounded-[8px] border border-solid border-[#AFAFAF] focus:border-[#1AA2A2] focus:outline-0',
                    disabled && 'cursor-not-allowed opacity-50',
                    className,
                )}
                value={value}
                size={size} // 'small', 'middle', 'large'
                format={format}
                showText={showText}
                allowClear={allowClear}
                disabled={disabled}
                onChange={onChange}
                {...props} // Spread additional props for flexibility
            />
        </ConfigProvider>
    );
};

export default ColorPickerUI;
