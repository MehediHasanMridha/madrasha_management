import MonthlySalaryPrintReceiptComponent from '@/Components/Shared/MonthlySalaryPrintReceiptComponent';
import TableUI from '@/Components/UI/TableUI';
import { router } from '@inertiajs/react';
import { ScrollText } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const StaffSalaryTransactionsTableContainer = ({ data, staff, year }) => {
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const ref = useRef();

    const columns = [
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'date',
            render: (record) => (
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
            dataIndex: 'voucher_type.name',
            key: 'voucher_type',
            render: (text) => <span className="text-[14px] text-gray-600">{text || 'Salary'}</span>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <span className="text-[14px] font-semibold text-black">{text.toLocaleString('en-US')} BDT</span>,
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
            route('staff.details', {
                staff_id: staff?.unique_id,
                page: pagination.current,
                per_page: pagination.pageSize,
            }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onStart: () => {
                    setLoading(true);
                },
                onFinish: () => {
                    setLoading(false);
                },
                onError: (errors) => {
                    console.log('Error in salary transactions:', errors);
                    setLoading(false);
                },
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
        contentRef: ref,
        documentTitle: `Monthly_Salary_Receipt_${staff?.unique_id}_${new Date().toISOString().split('T')[0]}`,
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
            <TableUI
                columns={columns}
                data={data}
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
            <MonthlySalaryPrintReceiptComponent data={selectedData || {}} staff={staff} ref={ref} />
        </>
    );
};

export default StaffSalaryTransactionsTableContainer;
