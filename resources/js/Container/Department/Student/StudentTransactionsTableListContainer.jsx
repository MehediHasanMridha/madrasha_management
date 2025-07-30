import AdmissionFeePrintReceiptComponent from '@/Components/Shared/AdmissionFeePrintReceiptComponent';
import ExamFeePrintReceiptComponent from '@/Components/Shared/ExamFeePrintReceiptComponent';
import MonthlyFeePrintReceiptComponent from '@/Components/Shared/MonthlyFeePrintReceiptComponent';
import TableUI from '@/Components/UI/TableUI';
import { router } from '@inertiajs/react';
import { ScrollText } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const StudentTransactionsTableListContainer = ({ data, department, student, academicFee, boardingFee }) => {
    const [loading, setLoading] = useState(false);
    const printComponentRef = useRef(null);
    const [selectedData, setSelectedData] = useState(null);
    const [type, setType] = useState(null);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'date',
            render: (record, text) => (
                <span className="text-[14px] font-semibold text-black">
                    {new Date(record).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </span>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'details',
            key: 'type',
            render: (record, text) => {
                const type = JSON.parse(record)?.type || null;
                if (type === 'exam' || type === 'exam_fee') {
                    return <span className="text-[14px] font-semibold text-black">Exam Fee</span>;
                }
                if (type === 'admission_fee') {
                    return <span className="text-[14px] font-semibold text-black">Admission Fee</span>;
                }
                return <span className="text-[14px] font-semibold text-black">Monthly Fee</span>;
            },
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <span className="text-[14px] font-semibold text-black">{text}</span>,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <span className="cursor-pointer text-[14px] font-semibold">
                    <ScrollText
                        onClick={() => {
                            setType(JSON.parse(record.details)?.type || 'monthly_fee');
                            setSelectedData(record);
                            printFn();
                        }}
                        className="mx-auto cursor-pointer hover:text-blue-500"
                    />
                </span>
            ),
        },
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        router.get(
            route('department.student_details', {
                department_slug: department?.slug,
                student_id: student?.unique_id,
                page: pagination.current,
                per_page: pagination.pageSize,
            }),
            {},
            {
                onStart: () => {
                    setLoading(true);
                },
                onFinish: () => {
                    setLoading(false);
                },
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleBeforePrint = useCallback(() => {
        setLoading(true);
        return Promise.resolve();
    }, []);

    const handleAfterPrint = () => {
        setLoading(false);
    };

    const printFn = useReactToPrint({
        contentRef: printComponentRef,
        documentTitle: `Monthly_Fee_Receipt_${student?.unique_id}_${new Date().toISOString().split('T')[0]}`,
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

    let printableComponent = null;
    if (type === 'monthly_fee') {
        printableComponent = <MonthlyFeePrintReceiptComponent ref={printComponentRef} data={selectedData} student={student} />;
    } else if (type === 'exam' || type === 'exam_fee') {
        // Assuming you have a similar component for exam fee receipts
        printableComponent = <ExamFeePrintReceiptComponent ref={printComponentRef} data={selectedData} student={student} />;
    } else if (type === 'admission_fee') {
        printableComponent = <AdmissionFeePrintReceiptComponent ref={printComponentRef} data={selectedData} student={student} />;
    }

    return (
        <>
            <TableUI
                columns={columns}
                dataSource={data?.data}
                pagination={{
                    current: data?.current_page,
                    pageSize: data?.per_page,
                    total: data?.total,
                    showSizeChanger: true,
                }}
                loading={loading}
                rowKey={(record) => record.id}
                onChange={handleTableChange}
            />
            <div className="hidden print:block">{printableComponent}</div>
        </>
    );
};

export default StudentTransactionsTableListContainer;
