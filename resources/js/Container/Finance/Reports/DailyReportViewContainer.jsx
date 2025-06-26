import DailyReportViewComponent from '@/Components/Finance/Reports/DailyReportViewComponet';
import { router, usePage } from '@inertiajs/react';
import { notification } from 'antd';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const DailyReportViewContainer = ({ reportViewModal, setReportViewModal, reportViewData, setReportViewData, loading, day, is_approved }) => {
    const { user } = usePage().props.auth;
    const printViewDom = useRef(null);
    const [confirm, setConfirm] = useState(false);

    const printFn = useReactToPrint({
        contentRef: printViewDom,
        documentTitle: `Daily_Report_${new Date().toISOString().split('T')[0]}`,
        // onAfterPrint: handleAfterPrint,
        // onBeforePrint: handleBeforePrint,
        // receipt page size is small & font size is small & print to printable area
        pageStyle: `
                @media print {
                    @page {
                        size: A4;
                        margin: 32px;
                    }
                    body {
                        font-size: 14px;
                        margin: 0;
                        padding: 0;
                    }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                }
            `,
    });

    const handleApprove = (date) => {
        router.post(
            route('finance.approve_daily_report'),
            {
                date: date,
            },
            {
                onSuccess: () => {
                    setReportViewModal(false);
                    setReportViewData(null);
                    notification.success({
                        message: 'Daily Report Approved',
                        description: 'The daily report has been successfully approved.',
                        placement: 'bottomRight',
                    });
                },
                onError: (error) => {
                    console.error('Error approving daily report:', error);
                },
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <DailyReportViewComponent
            reportViewModal={reportViewModal}
            setReportViewModal={setReportViewModal}
            printViewDom={printViewDom}
            reportViewData={reportViewData}
            loading={loading}
            user={user}
            printFn={printFn}
            day={day}
            is_approved={is_approved}
            handleApprove={handleApprove}
            setConfirm={setConfirm}
            confirm={confirm}
        />
    );
};

export default DailyReportViewContainer;
