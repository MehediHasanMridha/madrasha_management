import TableUI from '@/Components/UI/TableUI';

const FeeTableListContainer = ({ fee }) => {
    console.log('🚀 ~ FeeTableListContainer ~ fee:', fee);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
    ];

    return <TableUI dataSource={fee} columns={columns} pagination={false} />;
};

export default FeeTableListContainer;
