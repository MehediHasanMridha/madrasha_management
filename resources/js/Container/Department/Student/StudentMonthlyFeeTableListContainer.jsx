import TableUI from '@/Components/UI/TableUI';
import { cn } from '@/lib/utils';

const StudentMonthlyFeeTableListContainer = ({ data, academicFee, boardingFee }) => {
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
                        <div className="flex w-full items-center justify-center">
                            <span className="w-[56px] rounded-full border-[0.5px] border-[#00A606] bg-[#E4FFE5] text-[14px] font-semibold text-[#00A606]">
                                Paid
                            </span>
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

    return <TableUI columns={columns} dataSource={dataSource} pagination={false} />;
};

export default StudentMonthlyFeeTableListContainer;
