import TableUI from '@/Components/UI/TableUI';
import { cn } from '@/lib/utils';

const StaffMonthlySalaryTableContainer = ({ data, salary, staff, year }) => {
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
            title: 'Expected Salary',
            dataIndex: 'expected_salary',
            key: 'expected_salary',
            align: 'right',
            render: (text, record) => (
                <span className={cn('text-[14px] font-semibold text-black', record?.status === 'Paid' && 'text-[#00A606]')}>
                    {text?.toLocaleString('en-US') || '0'} BDT
                </span>
            ),
        },
        {
            title: 'Paid Amount',
            dataIndex: 'paid_amount',
            key: 'paid_amount',
            align: 'right',
            render: (text, record) => (
                <span className={cn('text-[14px] font-semibold text-black', record?.status === 'Paid' && 'text-[#00A606]')}>
                    {text?.toLocaleString('en-US') || '0'} BDT
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
                if (record?.status === 'Partial') {
                    return (
                        <div className="flex w-full items-center justify-center">
                            <span className="w-[60px] rounded-full border-[0.5px] border-[#FF9500] bg-[#FFF4E5] text-[14px] font-semibold text-[#FF9500]">
                                Partial
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
            const monthlyData = data?.find((item) => item?.month === month);
            const totalPaid = monthlyData?.salaries?.reduce((sum, salary) => sum + Number(salary.amount), 0) || 0;
            const expectedSalary = salary || 0;

            let status = 'Unpaid';
            if (totalPaid >= expectedSalary && totalPaid > 0) {
                status = 'Paid';
            } else if (totalPaid > 0 && totalPaid < expectedSalary) {
                status = 'Partial';
            }

            return {
                key: index,
                month: month,
                expected_salary: expectedSalary,
                paid_amount: totalPaid,
                status: status,
            };
        },
    );

    return <TableUI columns={columns} dataSource={dataSource} pagination={false} />;
};

export default StaffMonthlySalaryTableContainer;
