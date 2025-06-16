import TableUI from '@/Components/UI/TableUI';

const StudentExamFeeListTableContainer = ({ data, setSelectedRows, selectedRows }) => {
    const columns = [
        {
            title: 'Exam',
            dataIndex: 'exam',
            key: 'exam',
        },
        {
            title: 'Fee',
            dataIndex: 'fee',
            key: 'fee',
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
                if (record?.status === 'Unpaid') {
                    return <span className="font-semibold text-black">Unpaid</span>;
                }
            },
        },
    ];

    const dataSource = data?.map((item, index) => {
        return {
            key: index,
            exam: item?.name,
            fee: item?.exam_fee,
            fee_type_id: item?.fee_type_id,
            status: item?.is_paid ? 'Paid' : 'Unpaid',
        };
    });

    return (
        <TableUI
            pagination={false}
            columns={columns}
            dataSource={dataSource}
            rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys, selectedRows, info) => {
                    setSelectedRows(selectedRows);
                },
                selectedRowKeys: selectedRows.map((item) => item?.key),
                getCheckboxProps: (record) => ({
                    disabled: record?.status === 'Paid', // Column configuration not to be checked
                    // defaultChecked: record?.status === 'Paid' ? false : true,
                }),
            }}
            rowKey={(record) => record?.key}
        />
    );
};

export default StudentExamFeeListTableContainer;
