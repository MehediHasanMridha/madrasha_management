import dailyReportFileIcon from '@/assets/images/dailyReportFileIcon.svg';
import { router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const DailyReportComponent = ({ daysArray, month }) => {
    return (
        <div className="py-6">
            <FinanceTabBarComponent tab="reports" />
            <span
                className="flex w-fit cursor-pointer gap-1 p-4 text-black hover:text-gray-500"
                onClick={() =>
                    router.get(
                        route('finance.reports'),
                        {},
                        {
                            preserveState: true,
                            preserveScroll: true,
                        },
                    )
                }
            >
                <ArrowLeft strokeWidth={1.5} absoluteStrokeWidth />
                back
            </span>
            <div className="">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {daysArray?.map((day, index) => (
                        <div
                            key={index}
                            className="flex h-[236px] w-[236px] cursor-pointer flex-col items-center justify-center gap-y-4 rounded-lg p-4 px-8 text-center hover:bg-white"
                        >
                            <img src={dailyReportFileIcon} className="mx-auto h-fit" alt="" />
                            <p className="">
                                {month}-{day}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DailyReportComponent;
