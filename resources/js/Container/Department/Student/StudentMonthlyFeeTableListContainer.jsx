import MonthlyFeePrintReceiptComponent from '@/Components/Shared/MonthlyFeePrintReceiptComponent';
import TableUI from '@/Components/UI/TableUI';
import { cn } from '@/lib/utils';
import { FileCheck } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const StudentMonthlyFeeTableListContainer = ({ data, academicFee, boardingFee, student, year }) => {
    console.log('🚀 ~ StudentMonthlyFeeTableListContainer ~ data:', data);
    const [loading, setLoading] = useState(false);
    const printComponentRef = useRef(null);

    const columns = [
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month',
            render: (text, record) => (
                <span
                    className={cn(
                        'text-[14px] font-semibold text-black',
                        record?.status === 'Paid' && 'text-[#00A606]',
                        record?.status === 'Due' && 'text-[#00A606]',
                    )}
                >
                    {text}
                </span>
            ),
        },
        {
            title: 'Boarding Fee',
            dataIndex: 'boarding_fee',
            key: 'boarding_fee',
            align: 'right',
            render: (text, record) => (
                <span
                    className={cn(
                        'text-[14px] font-semibold text-black',
                        record?.status === 'Paid' && 'text-[#00A606]',
                        record?.status === 'Due' && 'text-[#00A606]',
                    )}
                >
                    {text.toLocaleString('en-US')}
                </span>
            ),
        },
        {
            title: 'Academic Fee',
            dataIndex: 'academic_fee',
            key: 'academic_fee',
            align: 'right',
            render: (text, record) => (
                <span
                    className={cn(
                        'text-[14px] font-semibold text-black',
                        record?.status === 'Paid' && 'text-[#00A606]',
                        record?.status === 'Due' && 'text-[#00A606]',
                    )}
                >
                    {text.toLocaleString('en-US')}
                </span>
            ),
        },
        {
            title: 'Due',
            dataIndex: 'due',
            key: 'due',
            align: 'right',
            render: (text, record) => (
                <span
                    className={cn(
                        'text-[14px] font-semibold',
                        record?.status === 'Due' ? 'text-red-500' : 'text-black',
                        record?.status === 'Paid' && 'text-[#00A606]',
                    )}
                >
                    {text.toLocaleString('en-US')}
                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (text, record) => {
                if (record?.status === 'Due') {
                    return (
                        <span className="cursor-pointer border-b-[1px] border-blue-500 text-[14px] font-semibold text-blue-500 hover:font-bold">
                            Pay Due
                        </span>
                    );
                }
                if (record?.status === 'Paid') {
                    return (
                        <div className="flex w-full items-center justify-center gap-x-2">
                            <span className="w-[56px] rounded-full border-[0.5px] border-[#00A606] bg-[#E4FFE5] text-[14px] font-semibold text-[#00A606]">
                                Paid
                            </span>
                            <FileCheck onClick={printFn} className="cursor-pointer hover:text-blue-500" />
                        </div>
                    );
                }
                if (record?.status === 'Unpaid') {
                    return <span className="font-semibold text-black">Unpaid</span>;
                }
            },
        },
    ];

    const dataSource = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
        (month, index) => {
            const monthLog = data?.find((item) => item?.month === month);
            const boardingFeeLog = monthLog?.fees?.find((item) => item?.fee_type.includes('Boarding Fee'));
            const academicFeeLog = monthLog?.fees?.find((item) => item?.fee_type.includes('Academic Fee'));

            const boardingFeeDue = Number(boardingFee) - monthLog?.fees?.find((item) => item?.fee_type.includes('Boarding Fee'))?.amount || 0;
            const academicFeeDue = Number(academicFee) - monthLog?.fees?.find((item) => item?.fee_type.includes('Academic Fee'))?.amount || 0;
            const boarding_fee = monthLog?.fees?.find((item) => item?.fee_type.includes('Boarding Fee'))?.amount || boardingFee;
            const academic_fee = monthLog?.fees?.find((item) => item?.fee_type.includes('Academic Fee'))?.amount || academicFee;
            const isPaid = !!(boardingFeeLog || academicFeeLog);

            return {
                key: index,
                month: month,
                boarding_fee: boarding_fee,
                academic_fee: academic_fee,
                due: boardingFeeDue + academicFeeDue,
                status: boardingFeeDue + academicFeeDue > 0 ? 'Due' : isPaid ? 'Paid' : 'Unpaid',
            };
        },
    );

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

    return (
        <>
            <TableUI columns={columns} dataSource={dataSource} pagination={false} />
            <div className="hidden print:block">
                <MonthlyFeePrintReceiptComponent
                    ref={printComponentRef}
                    data={student}
                    month={data[0]?.month}
                    year={year}
                    academicFee={academicFee}
                    boardingFee={boardingFee}
                    comments={data[0]?.fees[0]?.source_details}
                />
            </div>
        </>
    );
};

export default StudentMonthlyFeeTableListContainer;
