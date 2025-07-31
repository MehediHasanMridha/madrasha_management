import dailyReportFileIcon from '@/assets/images/dailyReportFileIcon.svg';
import dailyReportFileIconGreen from '@/assets/images/dailyReportFileIconGreen.png';
import MonthlyReportPrintReceiptComponent from '@/Components/Shared/MonthlyReportPrintReceiptComponent';
import BreadcrumbUI from '@/Components/UI/BreadcrumbUI';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CloudDownload } from 'lucide-react';
import FinanceTabBarComponent from '../FinanceTabBarComponent';
import MonthlyReportPdfComponent from './MonthlyReportPdfComponent';

const DailyReportComponent = ({
    daysArray,
    month,
    breadcrumbItems,
    handleClick,
    approvedReports,
    daysWithReportData,
    setIs_approved,
    downloadMonthlyReport,
    pdfData,
    isLoadingPdf,
}) => {
    return (
        <>
            <div className="py-6">
                <FinanceTabBarComponent tab="reports" />
                <div className="mb-6 flex items-center justify-between">
                    <BreadcrumbUI items={breadcrumbItems} />
                    {month && (
                        <div className="flex gap-2">
                            {!pdfData ? (
                                <button
                                    onClick={downloadMonthlyReport}
                                    disabled={isLoadingPdf}
                                    className="flex cursor-pointer gap-x-2 rounded-lg p-3 text-[#0267FF] transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <CloudDownload size={20} />
                                    {isLoadingPdf ? 'Loading...' : 'Generate Monthly Report'}
                                </button>
                            ) : (
                                <>
                                    <PDFDownloadLink
                                        document={<MonthlyReportPdfComponent pdfData={pdfData} />}
                                        fileName={`monthly-report-${month}-${new Date().getFullYear()}.pdf`}
                                    >
                                        {({ blob, url, loading, error }) =>
                                            loading ? (
                                                'Generating PDF...'
                                            ) : (
                                                <span className="flex cursor-pointer gap-x-2 rounded-lg p-3 text-[#0267FF] transition-colors hover:bg-gray-200">
                                                    <CloudDownload size={20} /> Download PDF
                                                </span>
                                            )
                                        }
                                    </PDFDownloadLink>
                                    <button
                                        onClick={downloadMonthlyReport}
                                        disabled={isLoadingPdf}
                                        className="flex cursor-pointer gap-x-2 rounded-lg p-3 text-gray-600 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isLoadingPdf ? 'Loading...' : 'Refresh Data'}
                                    </button>
                                </>
                            )}
                        </div>
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
            <MonthlyReportPrintReceiptComponent />
        </>
    );
};

export default DailyReportComponent;
