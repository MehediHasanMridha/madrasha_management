import FolderIcon from '@/assets/images/FolderIcon.svg';
import TooltipUI from '@/Components/UI/TooltipUI';
import { router } from '@inertiajs/react';
import { ArrowDownToLine } from 'lucide-react';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const ReportsComponent = ({ month, currentMonth, setDaysInMonth }) => {
    return (
        <div className="py-6">
            <FinanceTabBarComponent tab="reports" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {month?.slice(0, currentMonth).map((monthName, index) => (
                    <TooltipUI key={index} title="ডাবল ক্লিক করুন">
                        <div
                            key={index}
                            onDoubleClick={() => {
                                router.get(route('finance.daily_report'));
                                setDaysInMonth(new Date().getFullYear(), index + 1);
                            }}
                            className="flex h-[236px] w-[236px] cursor-pointer flex-col items-center justify-center gap-y-4 rounded-lg p-4 px-8 text-center hover:bg-white"
                        >
                            <img src={FolderIcon} className="mx-auto h-fit select-none" alt="" draggable="false" />
                            <p className="">{monthName}</p>
                            <div className="mx-auto hidden w-fit cursor-pointer rounded-[4px] border border-black p-2 group-hover:block hover:border-[#0267FF] hover:text-[#0267FF]">
                                <ArrowDownToLine strokeWidth={1.5} size={20} />
                            </div>
                        </div>
                    </TooltipUI>
                ))}
            </div>
        </div>
    );
};

export default ReportsComponent;
