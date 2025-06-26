import DailyReportComponent from '@/Components/Finance/Reports/DailyReportComponent';
import { useBoundStore } from '@/stores';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import DailyReportViewContainer from './DailyReportViewContainer';

const DailyReportContainer = () => {
    const { daysInMonth, month } = useBoundStore((state) => state);
    const [reportViewModal, setReportViewModal] = useState(false);
    const [reportViewData, setReportViewData] = useState(null);
    const [loading, setLoading] = useState(false);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const [day, setDay] = useState(null);

    const handleClick = async (day) => {
        const formattedDate = String(day).padStart(2, '0'); // Ensure day is two digits
        const formattedDay = `${formattedDate}-${month}-${new Date().getFullYear()}`; // Format as DD-MM-YYYY
        setDay(formattedDay);
        setReportViewModal(true);
        setLoading(true);
        const response = await axios.get(route('finance.daily_report_data', { month, day }));
        if (response.status === 200) {
            setReportViewData(response.data);
            setLoading(false);
        }
    };

    const breadcrumbItems = [
        {
            title: <Link href={route('finance.reports')}>Reports</Link>,
        },
        {
            title: <span className="cursor-pointer rounded-2xl">{month}</span>,
        },
    ];
    return (
        <>
            <DailyReportComponent daysArray={daysArray} month={month} breadcrumbItems={breadcrumbItems} handleClick={handleClick} />
            <DailyReportViewContainer
                reportViewModal={reportViewModal}
                setReportViewModal={setReportViewModal}
                reportViewData={reportViewData}
                setReportViewData={setReportViewData}
                loading={loading}
                day={day}
            />
        </>
    );
};

export default DailyReportContainer;
