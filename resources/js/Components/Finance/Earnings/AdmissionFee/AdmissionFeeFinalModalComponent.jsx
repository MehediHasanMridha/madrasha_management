import AdmissionFeePrintReceiptComponent from '@/Components/Shared/AdmissionFeePrintReceiptComponent';
import StaticBtn from '@/Components/UI/StaticBtn';
import { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
const AdmissionFeeFinalModalComponent = ({ data, month = '', selectedClassAdmissionFee, comments, handleClose }) => {
    const [loading, setLoading] = useState(false);
    const printComponentRef = useRef(null);
    const handleBeforePrint = useCallback(() => {
        setLoading(true);
        return Promise.resolve();
    }, []);

    const handleAfterPrint = () => {
        setLoading(false);
        handleClose();
    };

    const printFn = useReactToPrint({
        contentRef: printComponentRef,
        documentTitle: `Exam_Fee_Receipt_${data?.unique_id}_${new Date().toISOString().split('T')[0]}`,
        onAfterPrint: handleAfterPrint,
        onBeforePrint: handleBeforePrint,
        // Receipt page size is small & font size is small & print to printable area
        pageStyle: `
                @media print {
                    @page {
                        size: A5;
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
        <div className="flex h-full flex-col space-y-4 px-2">
            {/* Printable Receipt Content */}
            <AdmissionFeePrintReceiptComponent
                ref={printComponentRef}
                data={data}
                month={month}
                selectedClassAdmissionFee={selectedClassAdmissionFee}
                comments={comments}
            />
            <div className="mt-auto flex w-full gap-[18px] pt-4 print:hidden">
                <StaticBtn
                    onClick={() => {
                        handleClose();
                    }}
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#0267FF] hover:text-white"
                >
                    Close
                </StaticBtn>
                <StaticBtn
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#0267FF] text-white"
                    onClick={printFn}
                >
                    {loading ? 'generating...' : 'Print Receipt'}
                </StaticBtn>
            </div>
        </div>
    );
};

export default AdmissionFeeFinalModalComponent;
