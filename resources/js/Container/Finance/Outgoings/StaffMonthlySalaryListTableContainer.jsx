import TableUI from '@/Components/UI/TableUI';
import { cn } from '@/lib/utils';

const StaffMonthlySalaryListTableContainer = ({ data, setExpense, setSelectedRows, selectedRows, expense }) => {
    const columns = [
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month',
            render: (text, record) => (
                <span className={cn('text-[14px] font-semibold text-black', record?.status === 'Paid' && 'text-[#00A606]')}>{text}</span>
            ),
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            key: 'salary',
            align: 'right',
            render: (text, record) => (
                <span className={cn('text-[14px] font-semibold text-black', record?.status === 'Paid' && 'text-[#00A606]')}>
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
                if (record?.status === 'Paid') {
                    return (
                        <div className="flex w-full items-center justify-center">
                            <span className="w-[56px] rounded-full border-[0.5px] border-[#00A606] bg-[#E4FFE5] text-[14px] font-semibold text-[#00A606]">
                                Paid
                            </span>
                        </div>
                    );
                }
                return <span className="font-semibold text-black">Unpaid</span>;
            },
        },
    ];

    const dataSource = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
        (month, index) => {
            const isPaid = data?.expenses?.find((item) => item?.month === month) ? true : false;

            return {
                key: index,
                month: month,
                salary: data?.salary || 0,
                status: isPaid ? 'Paid' : 'Unpaid',
            };
        },
    );

    return (
        <TableUI
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys, selectedRows) => {
                    setSelectedRows(selectedRows);
                    setExpense({
                        ...expense,
                        amount: selectedRows.reduce((acc, curr) => acc + Number(curr?.salary), 0),
                    });
                },
                selectedRowKeys: selectedRows.map((item) => item?.key),
                getCheckboxProps: (record) => ({
                    disabled: record?.status === 'Paid',
                }),
            }}
            rowKey={(record) => record?.key}
        />
    );
};

export default StaffMonthlySalaryListTableContainer;
