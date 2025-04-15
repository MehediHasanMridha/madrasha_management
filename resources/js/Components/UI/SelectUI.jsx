import { cn } from '@/lib/utils';
import { ConfigProvider, Select } from 'antd';
const SelectUI = ({ options, className, ...props }) => {
    const internalOptions = [
        {
            value: '1',
            label: 'Not Identified',
        },
        {
            value: '2',
            label: 'Closed',
        },
        {
            value: '3',
            label: 'Communicated',
        },
        {
            value: '4',
            label: 'Identified',
        },
        {
            value: '5',
            label: 'Resolved',
        },
        {
            value: '6',
            label: 'Cancelled',
        },
    ];
    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        activeBorderColor: 'transparent',
                        hoverBorderColor: 'transparent',
                        activeOutlineColor: 'transparent',
                    },
                },
                token: {
                    borderRadiusLG: 0,
                    borderRadius: 0,
                    colorBorder: 'transparent',
                },
            }}
        >
            <Select
                showSearch
                style={{ height: '40px' }}
                className={cn('w-full border border-gray-300 text-sm text-gray-900 focus:border-[#1AA2A2] focus:ring-[#1AA2A2]', className)}
                placeholder="Search to Select"
                optionFilterProp="label"
                filterSort={(optionA, optionB) => {
                    var _a, _b;
                    return ((_a = optionA === null || optionA === void 0 ? void 0 : optionA.label) !== null && _a !== void 0 ? _a : '')
                        .toLowerCase()
                        .localeCompare(
                            ((_b = optionB === null || optionB === void 0 ? void 0 : optionB.label) !== null && _b !== void 0
                                ? _b
                                : ''
                            ).toLowerCase(),
                        );
                }}
                options={options || internalOptions}
                {...props}
            />
        </ConfigProvider>
    );
};
export default SelectUI;
