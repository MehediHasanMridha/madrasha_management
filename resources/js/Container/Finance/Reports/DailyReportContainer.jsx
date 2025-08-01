import DailyReportComponent from '@/Components/Finance/Reports/DailyReportComponent';
import { useBoundStore } from '@/stores';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import DailyReportViewContainer from './DailyReportViewContainer';

const DailyReportContainer = ({ approvedReports }) => {
    const { daysInMonth, month } = useBoundStore((state) => state);
    const [reportViewModal, setReportViewModal] = useState(false);
    const [reportViewData, setReportViewData] = useState(null);
    const [loading, setLoading] = useState(false);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const [day, setDay] = useState(null);
    const [is_approved, setIs_approved] = useState(false);
    const [pdfData, setPdfData] = useState(null);
    const [isLoadingPdf, setIsLoadingPdf] = useState(false);

    // Process approved reports to create a map for quick lookup
    const approvedReportsMap = approvedReports?.reduce((acc, report) => {
        acc[parseInt(report.day_number)] = report;
        return acc;
    }, {});

    // Merge daysArray with approvedReports data
    const daysWithReportData = daysArray.map((day) => {
        const reportData = approvedReportsMap[day];
        return {
            day_number: String(day),
            is_approved: reportData ? true : false,
        };
    });

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

    // Download monthly report
    const downloadMonthlyReport = async () => {
        try {
            setIsLoadingPdf(true);
            setPdfData(null); // Reset previous data
            const response = await axios.get(route('download_monthly_report', { month }));
            if (response.status === 200) {
                setPdfData(response.data.data); // Extract the data object from response
            }
        } catch (error) {
            console.error('Error downloading monthly report:', error);
            // You might want to show an error notification here
        } finally {
            setIsLoadingPdf(false);
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
            <DailyReportComponent
                daysArray={daysArray}
                month={month}
                breadcrumbItems={breadcrumbItems}
                handleClick={handleClick}
                approvedReports={approvedReports}
                daysWithReportData={daysWithReportData}
                setIs_approved={setIs_approved}
                downloadMonthlyReport={downloadMonthlyReport}
                pdfData={pdfData}
                isLoadingPdf={isLoadingPdf}
            />
            <DailyReportViewContainer
                reportViewModal={reportViewModal}
                setReportViewModal={setReportViewModal}
                reportViewData={reportViewData}
                setReportViewData={setReportViewData}
                loading={loading}
                day={day}
                is_approved={is_approved}
            />
        </>
    );
};

export default DailyReportContainer;
