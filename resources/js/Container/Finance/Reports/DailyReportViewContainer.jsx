import DailyReportViewComponent from '@/Components/Finance/Reports/DailyReportViewComponet';
import { usePage } from '@inertiajs/react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const DailyReportViewContainer = ({ reportViewModal, setReportViewModal, reportViewData, setReportViewData, loading }) => {
    const { user } = usePage().props.auth;
    const printViewDom = useRef(null);

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
                        font-size: 12px;
                        margin: 0;
                        padding: 0;
                        line-height: 1.2;
                    }
                }
            `,
    });

    return (
        <DailyReportViewComponent
            reportViewModal={reportViewModal}
            setReportViewModal={setReportViewModal}
            printViewDom={printViewDom}
            reportViewData={reportViewData}
            loading={loading}
            user={user}
            printFn={printFn}
        />
    );
};

export default DailyReportViewContainer;
