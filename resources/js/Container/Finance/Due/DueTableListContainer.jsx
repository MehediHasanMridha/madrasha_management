import TableUI from '@/Components/UI/TableUI';

const DueTableListContainer = ({ data }) => {
    const dataSource =
        data?.data?.map((item) => ({
            key: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            gender: item.gender,
            due: item.due_amount,
            studentID: item.unique_id,
            class: item.class,
            department: item.department,
            feeType: item.fee_type,
            month: item.period,
        })) || [];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Fee Type',
            dataIndex: 'feeType',
            key: 'feeType',
        },
        {
            title: 'Due',
            dataIndex: 'due',
            key: 'due',
        },
        {
            title: 'Student ID',
            dataIndex: 'studentID',
            key: 'studentID',
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
    ];

    return <TableUI dataSource={dataSource} columns={columns} />;
};

export default DueTableListContainer;
