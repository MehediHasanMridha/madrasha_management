import TableUI from '@/Components/UI/TableUI';
import TagUI from '@/Components/UI/TagUI';
import { cn } from '@/lib/utils';

const StudentMonthlyFeeListTableContainer = ({ data, setFee, setSelectedRows, selectedRows, fee }) => {
    const columns = [
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month',
            render: (text, record) => (
                <span
                    className={cn(
                        'text-[14px] font-semibold text-black',
                        record?.status === 'Paid' && 'text-green-500',
                        record?.status === 'Due' && 'text-green-500',
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
                        record?.status === 'Paid' && 'text-green-500',
                        record?.status === 'Due' && 'text-green-500',
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
                        record?.status === 'Paid' && 'text-green-500',
                        record?.status === 'Due' && 'text-green-500',
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
                        record?.status === 'Paid' && 'text-green-500',
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
                    return <span className="text-[14px] font-semibold text-blue-500">Pay Due</span>;
                }
                if (record?.status === 'Paid') {
                    return <TagUI color="#87d068">Paid</TagUI>;
                }
                if (record?.status === 'Unpaid') {
                    return <TagUI color="#f50">Unpaid</TagUI>;
                }
            },
        },
    ];

    const dataSource = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
        (month, index) => {
            const boardingFeeDue =
                data?.income_logs?.find((item) => item?.month == month)?.fees?.find((item) => item?.type === 'boarding-fee')?.due || 0;
            const academicFeeDue =
                data?.income_logs?.find((item) => item?.month == month)?.fees?.find((item) => item?.type === 'academic-fee')?.due || 0;
            const boardingFee = data?.boarding_fee - boardingFeeDue;

            const academicFee = data?.academic_fee - academicFeeDue;
            const isPaid = data?.income_logs?.find((item) => item?.month == month) ? true : false;

            return {
                key: index,
                month: month,
                boarding_fee: boardingFeeDue ? data?.boarding_fee - boardingFeeDue : boardingFee,
                academic_fee: academicFeeDue ? data?.academic_fee - academicFeeDue : academicFee,
                due: boardingFeeDue + academicFeeDue,
                status: boardingFeeDue + academicFeeDue > 0 ? 'Due' : isPaid ? 'Paid' : 'Unpaid',
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
                onChange: (selectedRowKeys, selectedRows, info) => {
                    setSelectedRows(selectedRows);
                    setFee({
                        ...fee,
                        boarding_fee: selectedRows.reduce((acc, curr) => acc + curr?.boarding_fee, 0),
                        academic_fee: selectedRows.reduce((acc, curr) => acc + curr?.academic_fee, 0),
                        total: selectedRows.reduce((acc, curr) => acc + curr?.boarding_fee + curr?.academic_fee, 0),
                    });
                },
                selectedRowKeys: selectedRows.map((item) => item?.key),
                getCheckboxProps: (record) => ({
                    disabled: record?.status === 'Paid' || record?.status === 'Due', // Column configuration not to be checked
                    // defaultChecked: record?.status === 'Paid' ? false : true,
                }),
            }}
            rowKey={(record) => record?.key}
        />
    );
};

export default StudentMonthlyFeeListTableContainer;
