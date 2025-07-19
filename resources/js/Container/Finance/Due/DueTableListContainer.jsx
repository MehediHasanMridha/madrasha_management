import TableUI from '@/Components/UI/TableUI';
import { router } from '@inertiajs/react';

const DueTableListContainer = ({ data }) => {
    console.log('🚀 ~ DueTableListContainer ~ data:', data);
    const dataSource =
        data?.data?.map((item) => ({
            key: item.id,
            name: item.name,
            phone: item.phone,
            gender: item.gender,
            fatherName: item.father_name,
            due: item.due_amount,
            studentID: item.unique_id,
            class: item.class,
            department: item.department,
        })) || [];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Student ID',
            dataIndex: 'studentID',
            key: 'studentID',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Father Name',
            dataIndex: 'fatherName',
            key: 'fatherName',
        },
        {
            title: 'Due',
            dataIndex: 'due',
            key: 'due',
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
                    route('finance.due_list', {
                        ...route().params,
                        per_page: pagination.pageSize,
                        page: pagination.current,
                    }),
                    {},
                    {
                        preserveState: true,
                        preserveScroll: true,
                        // onStart: () => {
                        //     setIsLoading(true);
                        // },
                        // onFinish: () => {
                        //     setIsLoading(false);
                        // },
                        // onError: (errors) => {
                        //     console.log('🚀 ~ handleTableChange ~ errors:', errors);
                        //     setIsLoading(false);
                        // },
                    },
                );
            }}
            rowKey={data?.id}
        />
    );
};

export default DueTableListContainer;
