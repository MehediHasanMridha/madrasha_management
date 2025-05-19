import SettingDropdownContainer from '@/Container/Shared/SettingDropdownContainer';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { BanknoteArrowDown, BanknoteArrowUp, ChartPie, FileSpreadsheet } from 'lucide-react';

const FinanceTabBarComponent = ({ tab }) => {
    return (
        <div className="mb-6 flex w-full items-center justify-between rounded-lg bg-white p-[24px]">
            <div className="flex items-center space-x-[24px]">
                <Link
                    href={route('finance.summary')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px]',
                        tab === 'summary' ? 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]' : 'text-[#4A4A4A]',
                    )}
                    preserveState
                    preserveScroll
                    as="button"
                    prefetch
                >
                    <ChartPie size={24} strokeWidth={1.5} />
                    <span>Summary</span>
                </Link>
                <Link
                    href={route('finance.earnings')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px]',
                        tab === 'earnings' ? 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]' : 'text-[#4A4A4A]',
                    )}
                    preserveState
                    preserveScroll
                    as="button"
                    prefetch
                >
                    <BanknoteArrowUp strokeWidth={1.5} size={24} />
                    <span>Earnings</span>
                </Link>
                <Link
                    href={route('finance.outgoings')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px]',
                        tab === 'outgoings' ? 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]' : 'text-[#4A4A4A]',
                    )}
                    preserveState
                    preserveScroll
                    as="button"
                    prefetch
                >
                    <BanknoteArrowDown strokeWidth={1.5} />
                    <span>Outgoings</span>
                </Link>
                <Link
                    href={route('finance.reports')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px]',
                        tab === 'reports' ? 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]' : 'text-[#4A4A4A]',
                    )}
                    preserveState
                    preserveScroll
                    as="button"
                    prefetch
                >
                    <FileSpreadsheet strokeWidth={1.5} />
                    <span>Report</span>
                </Link>
            </div>
            <SettingDropdownContainer />
        </div>
    );
};

export default FinanceTabBarComponent;
