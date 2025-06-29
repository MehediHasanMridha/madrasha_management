import TableUI from '@/Components/UI/TableUI';
import { router } from '@inertiajs/react';
import { Tooltip } from 'antd';

const PaidListTableContainer = ({ data }) => {
    const dataSource =
        data?.data?.map((item) => ({
            key: item.id,
            name: item.name,
            phone: item.phone,
            gender: item.gender,
            totalPaid: item.total_paid,
            paymentCount: item.payment_count,
            studentID: item.unique_id,
            class: item.class,
            department: item.department,
            payments: item.payments,
        })) || [];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="flex flex-col">
                    <span className="font-medium">{text}</span>
                    <span className="text-xs text-gray-500">{record.studentID}</span>
                </div>
            ),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Total Paid',
            dataIndex: 'totalPaid',
            key: 'totalPaid',
            render: (amount) => <span className="font-semibold text-green-600">৳{parseFloat(amount).toLocaleString()}</span>,
        },
        {
            title: 'Payment Details',
            dataIndex: 'payments',
            key: 'payments',
            render: (payments) => (
                <Tooltip
                    title={
                        <div className="space-y-1">
                            {payments.map((payment, index) => (
                                <div key={index} className="text-xs">
                                    <div>
                                        <strong>{payment.fee_type}:</strong> ৳{payment.amount}
                                    </div>
                                    <div>Period: {payment.payment_period}</div>
                                    <div>Date: {new Date(payment.created_at).toLocaleDateString()}</div>
                                    {index < payments.length - 1 && <hr className="my-1" />}
                                </div>
                            ))}
                        </div>
                    }
                    placement="left"
                    overlayClassName="max-w-xs"
                >
                    <button className="text-blue-600 hover:text-blue-800">View Details</button>
                </Tooltip>
            ),
        },
    ];

    return (
        <TableUI
            dataSource={dataSource}
            pagination={{
                pageSize: data?.per_page,
                current: data?.current_page,
                showSizeChanger: true,
                total: data?.total,
                showTotal: (total) => <span className="text-md absolute left-0 font-bold">Total {total} Students</span>,
            }}
            columns={columns}
            onChange={(pagination, filters, sorter) => {
                router.get(
                    route('finance.paid_list', {
                        ...route().params,
                        per_page: pagination.pageSize,
                        page: pagination.current,
                    }),
                    {},
                    {
                        preserveState: true,
                        preserveScroll: true,
                    },
                );
            }}
        />
    );
};

export default PaidListTableContainer;
