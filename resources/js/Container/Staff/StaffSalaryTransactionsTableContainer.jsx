import TableUI from '@/Components/UI/TableUI';
import { router } from '@inertiajs/react';
import { ScrollText } from 'lucide-react';
import { useState } from 'react';

const StaffSalaryTransactionsTableContainer = ({ data, staff, year }) => {
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
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
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <span className="text-[14px] font-semibold text-black">{text.toLocaleString('en-US')} BDT</span>,
        },
        {
            title: 'Type',
            dataIndex: 'voucher_type.name',
            key: 'voucher_type',
            render: (text) => <span className="text-[14px] text-gray-600">{text || 'Salary'}</span>,
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
            render: (text) => <span className="text-[14px] text-gray-600">{text || 'Monthly Salary'}</span>,
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
                            // You can implement a print receipt functionality here
                            console.log('Print salary receipt for:', record);
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
                year: year,
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

    return (
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
    );
};

export default StaffSalaryTransactionsTableContainer;
