import DailyReportComponent from '@/Components/Finance/Reports/DailyReportComponent';
import { useBoundStore } from '@/stores';
import { Link } from '@inertiajs/react';

const DailyReportContainer = () => {
    const { daysInMonth, month } = useBoundStore((state) => state);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const breadcrumbItems = [
        {
            title: <Link href={route('finance.reports')}>Reports</Link>,
        },
        {
            title: <span className="cursor-pointer rounded-2xl">{month}</span>,
        },
    ];
    return <DailyReportComponent daysArray={daysArray} month={month} breadcrumbItems={breadcrumbItems} />;
};

export default DailyReportContainer;
