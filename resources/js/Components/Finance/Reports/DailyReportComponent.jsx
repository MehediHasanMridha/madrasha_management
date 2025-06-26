import dailyReportFileIcon from '@/assets/images/dailyReportFileIcon.svg';
import dailyReportFileIconGreen from '@/assets/images/dailyReportFileIconGreen.png';
import BreadcrumbUI from '@/Components/UI/BreadcrumbUI';
import { CloudDownload } from 'lucide-react';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const DailyReportComponent = ({ daysArray, month, breadcrumbItems, handleClick, approvedReports, daysWithReportData, setIs_approved }) => {
    return (
        <div className="py-6">
            <FinanceTabBarComponent tab="reports" />
            <div className="mb-6 flex items-center justify-between">
                <BreadcrumbUI items={breadcrumbItems} />
                {month && (
                    <span className="flex cursor-pointer gap-x-2 text-[#0267FF]">
                        <CloudDownload size={20} /> Download monthly report
                    </span>
                )}
            </div>
            <div className="">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {daysWithReportData?.map((day, index) => (
                        <div
                            key={index}
                            className="flex h-[236px] w-[236px] cursor-pointer flex-col items-center justify-center gap-y-4 rounded-lg p-4 px-8 text-center hover:bg-white"
                            onClick={() => {
                                handleClick(day.day_number);
                                setIs_approved(day.is_approved);
                            }}
                        >
                            <img
                                src={day.is_approved ? dailyReportFileIconGreen : dailyReportFileIcon}
                                className="mx-auto h-fit select-none"
                                draggable="false"
                                alt=""
                            />
                            <p className="">
                                {month}-{day.day_number}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DailyReportComponent;
