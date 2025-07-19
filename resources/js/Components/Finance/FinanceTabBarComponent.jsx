import SettingDropdownContainer from '@/Container/Shared/SettingDropdownContainer';
import Icons from '@/icons';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { BanknoteArrowDown, BanknoteArrowUp, ChartPie, FileSpreadsheet } from 'lucide-react';

const FinanceTabBarComponent = ({ tab }) => {
    return (
        <div className="mb-6 flex w-full flex-col items-start justify-between rounded-lg bg-white p-4 sm:p-6 lg:flex-row lg:items-center lg:p-[24px]">
            <div className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 mb-4 flex w-full items-center space-x-3 overflow-x-auto pb-3 sm:space-x-4 lg:mb-0 lg:w-auto lg:space-x-[24px] lg:overflow-x-visible lg:pb-0">
                <Link
                    href={route('finance.summary')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-2 text-sm whitespace-nowrap sm:text-base',
                        tab === 'summary' ? 'border-b-[1px] border-[#4891FF] px-2 py-[6px] text-[#4891FF] sm:px-[8px]' : 'text-[#4A4A4A]',
                    )}
                    preserveState
                    preserveScroll
                    as="button"
                    prefetch
                >
                    <ChartPie size={18} strokeWidth={1.5} className="sm:h-6 sm:w-6" />
                    <span>Summary</span>
                </Link>
                <Link
                    href={route('finance.earnings')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-2 text-sm whitespace-nowrap sm:text-base',
                        tab === 'earnings' ? 'border-b-[1px] border-[#4891FF] px-2 py-[6px] text-[#4891FF] sm:px-[8px]' : 'text-[#4A4A4A]',
                    )}
                    preserveState
                    preserveScroll
                    as="button"
                    prefetch
                >
                    <BanknoteArrowUp strokeWidth={1.5} size={18} className="sm:h-6 sm:w-6" />
                    <span>Earnings</span>
                </Link>
                <Link
                    href={route('finance.outgoings')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-2 text-sm whitespace-nowrap sm:text-base',
                        tab === 'outgoings' ? 'border-b-[1px] border-[#4891FF] px-2 py-[6px] text-[#4891FF] sm:px-[8px]' : 'text-[#4A4A4A]',
                    )}
                    preserveState
                    preserveScroll
                    as="button"
                    prefetch
                >
                    <BanknoteArrowDown strokeWidth={1.5} size={18} className="sm:h-6 sm:w-6" />
                    <span>Outgoings</span>
                </Link>
                <Link
                    href={route('finance.reports')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-2 text-sm whitespace-nowrap sm:text-base',
                        tab === 'reports' ? 'border-b-[1px] border-[#4891FF] px-2 py-[6px] text-[#4891FF] sm:px-[8px]' : 'text-[#4A4A4A]',
                    )}
                    preserveState
                    preserveScroll
                    as="button"
                    prefetch
                >
                    <FileSpreadsheet strokeWidth={1.5} size={18} className="sm:h-6 sm:w-6" />
                    <span>Report</span>
                </Link>
                <Link
                    href={route('finance.due_list')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-2 text-sm whitespace-nowrap sm:text-base',
                        tab === 'due_list' ? 'border-b-[1px] border-[#4891FF] px-2 py-[6px] text-[#4891FF] sm:px-[8px]' : 'text-[#4A4A4A]',
                    )}
                    preserveState
                    preserveScroll
                    as="button"
                    prefetch
                >
                    <Icons
                        name={'list'}
                        className={cn(tab === 'due_list' ? 'text-[#4891FF]' : 'text-[#4A4A4A]', 'h-[18px] w-[18px] sm:h-6 sm:w-6')}
                    />
                    <span>Due list</span>
                </Link>
                <Link
                    href={route('finance.paid_list')}
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-2 text-sm whitespace-nowrap sm:text-base',
                        tab === 'paid_list' ? 'border-b-[1px] border-[#4891FF] px-2 py-[6px] text-[#4891FF] sm:px-[8px]' : 'text-[#4A4A4A]',
                    )}
                    preserveState
                    preserveScroll
                    as="button"
                    prefetch
                >
                    <Icons
                        name={'list'}
                        className={cn(tab === 'paid_list' ? 'text-[#4891FF]' : 'text-[#4A4A4A]', 'h-[18px] w-[18px] sm:h-6 sm:w-6')}
                    />
                    <span>Paid list</span>
                </Link>
            </div>
            <SettingDropdownContainer />
        </div>
    );
};

export default FinanceTabBarComponent;
