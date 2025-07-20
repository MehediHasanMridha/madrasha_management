import FolderIcon from '@/assets/images/FolderIcon.svg';
import TooltipUI from '@/Components/UI/TooltipUI';
import { router } from '@inertiajs/react';
import { ArrowDownToLine } from 'lucide-react';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const ReportsComponent = ({ month, currentMonth, setDaysInMonth }) => {
    return (
        <div className="px-2 py-4 sm:px-4 sm:py-6">
            <FinanceTabBarComponent tab="reports" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {month?.slice(0, currentMonth).map((monthName, index) => (
                    <TooltipUI key={index} title="ডাবল ক্লিক করুন">
                        <div
                            key={index}
                            onDoubleClick={() => {
                                router.get(
                                    route('finance.daily_report'),
                                    { month: index + 1, year: new Date().getFullYear() },
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                    },
                                );
                                setDaysInMonth(new Date().getFullYear(), index + 1);
                            }}
                            className="flex h-[180px] w-full cursor-pointer flex-col items-center justify-center gap-y-3 rounded-lg p-3 text-center transition-colors hover:bg-white sm:h-[200px] sm:gap-y-4 sm:p-4 md:h-[220px] lg:h-[236px] lg:px-8"
                        >
                            <img src={FolderIcon} className="mx-auto h-24 w-24 select-none md:h-20 md:w-20" alt="" draggable="false" />
                            <p className="text-sm font-medium sm:text-base">{monthName}</p>
                            <div className="mx-auto hidden w-fit cursor-pointer rounded-[4px] border border-black p-1.5 transition-colors group-hover:block hover:border-[#0267FF] hover:text-[#0267FF] sm:p-2">
                                <ArrowDownToLine strokeWidth={1.5} size={16} className="sm:size-5" />
                            </div>
                        </div>
                    </TooltipUI>
                ))}
            </div>
        </div>
    );
};

export default ReportsComponent;
