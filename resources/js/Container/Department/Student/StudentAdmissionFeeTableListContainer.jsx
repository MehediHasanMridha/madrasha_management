import AdmissionFeePrintReceiptComponent from '@/Components/Shared/AdmissionFeePrintReceiptComponent';
import TableUI from '@/Components/UI/TableUI';
import { ScrollText } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const StudentAdmissionFeeTableListContainer = ({ data, student }) => {
    const [loading, setLoading] = useState(false);
    const printComponentRef = useRef(null);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Admission Fee',
            dataIndex: 'admission_fee',
            key: 'admission_fee',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div className="w-full font-semibold text-black">
                    <ScrollText onClick={printFn} className="mx-auto cursor-pointer hover:text-blue-500" />
                </div>
            ),
        },
    ];

    const dataSource = data
        .filter((item) => item?.fees?.some((fee) => fee.fee_type === 'Admission Fee'))
        .map((item) => {
            const admissionFee = item.fees.find((fee) => fee.fee_type === 'Admission Fee');
            return {
                date: admissionFee.created_at,
                admission_fee: admissionFee.amount,
                comments: admissionFee.source_details,
                receiver: admissionFee.receiver,
            };
        });

    const handleBeforePrint = useCallback(() => {
        setLoading(true);
        return Promise.resolve();
    }, []);

    const handleAfterPrint = () => {
        setLoading(false);
    };

    const printFn = useReactToPrint({
        contentRef: printComponentRef,
        documentTitle: `Admission_Fee_Receipt_${student?.unique_id}_${new Date().toISOString().split('T')[0]}`,
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
        <>
            <TableUI columns={columns} dataSource={dataSource} pagination={false} />
            <div className="hidden print:block">
                <AdmissionFeePrintReceiptComponent
                    ref={printComponentRef}
                    data={student}
                    admissionFee={dataSource[0]?.admission_fee}
                    comments={dataSource[0]?.comments}
                    receiver={dataSource[0]?.receiver || null}
                />
            </div>
        </>
    );
};

export default StudentAdmissionFeeTableListContainer;
