import DailyReportComponent from '@/Components/Finance/Reports/DailyReportComponent';
import { useBoundStore } from '@/stores';

const DailyReportContainer = () => {
    const { daysInMonth, month } = useBoundStore((state) => state);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return <DailyReportComponent daysArray={daysArray} month={month} />;
};

export default DailyReportContainer;
