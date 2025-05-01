import SettingDropdownContainer from '@/Container/Shared/SettingDropdownContainer';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { FaChartPie, FaMoneyBills } from 'react-icons/fa6';

const FinanceTabBarComponent = ({ tab }) => {
    return (
        <div className="mb-6 flex w-full items-center justify-between rounded-lg bg-white p-[24px]">
            <div className="flex items-center space-x-3">
                <Link
                    href={route('finance.summary')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px]',
                        tab === 'summary' ? 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]' : 'text-gray-500',
                    )}
                    preserveState
                    preserveScroll
                    as="button"
                >
                    <FaChartPie className="inline-flex" size={24} />
                    <span>Summary</span>
                </Link>
                <Link
                    href={route('finance.earnings')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px]',
                        tab === 'earnings' ? 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]' : 'text-gray-500',
                    )}
                    preserveState
                    preserveScroll
                    as="button"
                >
                    <FaMoneyBills className="inline-flex" size={24} />
                    <span>Earnings</span>
                </Link>
            </div>
            <SettingDropdownContainer />
        </div>
    );
};

export default FinanceTabBarComponent;
