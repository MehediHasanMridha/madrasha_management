import { cn } from '@/lib/utils';
import { ConfigProvider, DatePicker } from 'antd';
import enUS from 'antd/lib/locale/en_US'; // Default locale
import dayjs from 'dayjs';

const DatePickerUI = ({ value, className, height = 48, locale = enUS, format = 'D MMMM YYYY', theme = {}, onChange, ...props }) => {
    return (
        <ConfigProvider
            locale={locale}
            theme={{
                components: {
                    DatePicker: {
                        hoverBorderColor: '#AFAFAF',
                        activeBorderColor: '#AFAFAF',
                        activeShadow: 'none',
                    },
                },
                token: {
                    controlHeight: height,
                    colorBorder: '#AFAFAF',
                    ...theme.token, // Allow overriding theme tokens
                },
                ...theme, // Allow overriding the entire theme
            }}
        >
            <DatePicker
                className={cn('w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] text-black focus:outline-0', className)}
                defaultValue={dayjs(value)}
                format={format}
                onChange={onChange}
                {...props} // Spread additional props for flexibility
            />
        </ConfigProvider>
    );
};

export default DatePickerUI;
