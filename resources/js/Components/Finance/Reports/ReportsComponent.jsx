import FolderIcon from '@/assets/images/FolderIcon.svg';
import TooltipUI from '@/Components/UI/TooltipUI';
import { router } from '@inertiajs/react';
import { ArrowDownToLine } from 'lucide-react';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const ReportsComponent = ({ month, currentMonth, setDaysInMonth }) => {
    return (
        <div className="py-6">
            <FinanceTabBarComponent tab="reports" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {month?.slice(0, currentMonth).map((monthName, index) => (
                    <TooltipUI key={index} title="ডাবল ক্লিক করুন">
                        <div
                            key={index}
                            onDoubleClick={() => {
                                router.get(route('finance.daily_report'));
                                setDaysInMonth(new Date().getFullYear(), index + 1);
                            }}
                            className="group h-[200px] w-fit cursor-pointer items-center gap-2 rounded-lg p-4 text-center hover:bg-white"
                        >
                            <img src={FolderIcon} className="h-fit group-hover:scale-80" alt="" />
                            <p className="group-hover:-translate-y-2">{monthName}</p>
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
