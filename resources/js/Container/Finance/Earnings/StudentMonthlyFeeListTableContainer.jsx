import TableUI from '@/Components/UI/TableUI';
import { cn } from '@/lib/utils';
import { useState } from 'react';

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
                        <span
                            className="w-fit cursor-pointer border-b-[1px] border-blue-500 text-[14px] font-semibold text-blue-500 hover:border-blue-600 hover:text-blue-600"
                            onClick={() => setStep((prev) => prev + 1)}
                        >
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

    const [step, setStep] = useState(1);

    const dataSource = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
        (month, index) => {
            const monthLog = data?.income_logs?.find((item) => item?.month === month);
            const boardingFeeLog = monthLog?.fees?.find((item) => item?.type.toLowerCase().includes('boarding-fee'));
            const academicFeeLog = monthLog?.fees?.find((item) => item?.type.toLowerCase().includes('academic-fee'));

            const boardingFeeDue = boardingFeeLog?.due || 0;
            const academicFeeDue = academicFeeLog?.due || 0;
            const boardingFee = data?.boarding_fee - boardingFeeDue;
            const academicFee = data?.academic_fee - academicFeeDue;
            const isPaid = !!(boardingFeeLog || academicFeeLog);

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

    let content = null;

    switch (step) {
        case 1:
            content = (
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
            break;
        default:
            content = <>sdhfsd</>;
            break;
    }

    return content;
};

export default StudentMonthlyFeeListTableContainer;
