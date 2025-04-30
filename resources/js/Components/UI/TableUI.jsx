import { SearchOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Input, Table } from 'antd';
import { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';

const TableUI = ({ data, columns, showLoading = false, routeName, showRowSelection, sortOrder = 'asc', ...props }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [showLoading]);

    const handleTableChange = (pagination, filters, sorter) => {
        // router.get(
        //     route(routeName, {
        //         page: pagination.current,
        //         per_page: pagination.pageSize,
        //         sort_field: sorter?.field,
        //         order: sorter?.order === 'ascend' ? 'asc' : sorter?.order === 'descend' ? 'desc' : undefined,
        //         filters: { ...filters },
        //     }),
        //     {},
        //     {
        //         onStart: () => {
        //             setLoading(true);
        //         },
        //     },
        // );
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className="p-2" onKeyDown={(e) => e.stopPropagation()}>
                <ConfigProvider
                    theme={{
                        components: {
                            Input: {
                                hoverBorderColor: 'transparent',
                                activeBorderColor: 'transparent',
                            },
                            Button: {
                                defaultHoverColor: '#1AA2A2',
                                defaultHoverBorderColor: '#1AA2A2',
                            },
                        },
                        token: { colorPrimaryActive: '#1AA2A2' },
                    }}
                >
                    <Input
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        className="mb-[8px] rounded-md border-[1px] border-[#1AA2A2] hover:border-[#1AA2A2] focus:ring-0 focus:outline-none"
                    />
                    <div className="flex gap-2">
                        <Button
                            color="default"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            className="bg-[#1AA2A2] text-white hover:text-black"
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters();
                                handleSearch([], confirm, dataIndex);
                            }}
                            size="small"
                        >
                            Reset
                        </Button>
                    </div>
                </ConfigProvider>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined className="cursor-pointer text-xl text-[#1AA2A2]" />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        defaultSortOrder: sortOrder === 'asc' ? 'ascend' : sortOrder === 'desc' ? 'descend' : undefined,
    });

    const internalColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            hidden: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            filters: [
                { text: 'Joe', value: 'Joe' },
                { text: 'Jim', value: 'Jim' },
                {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [{ text: 'Green', value: 'Green' }],
                },
            ],
            filteredValue: ['Jim'],
            filterIcon: (filtered) => {
                return <FaFilter className={`text-xl ${filtered ? 'text-red-500' : ''}`} />;
            },
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div className="flex gap-2">
                    <span className="cursor-pointer text-xl">Edit</span>
                    <span className="cursor-pointer text-xl text-red-500">Delete</span>
                </div>
            ),
        },
    ];

    return (
        <Table
            rowSelection={
                showRowSelection && {
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows, info) => {
                        console.log('🚀 ~ TableUI ~ selectedRowKeys:', selectedRowKeys);
                        console.log('🚀 ~ TableUI ~ selectedRows:', selectedRows);
                        console.log('🚀 ~ TableUI ~ info:', info);
                    },
                    getCheckboxProps: (record) => ({
                        disabled: record.name === 'Disabled User',
                        name: record.name,
                    }),
                }
            }
            columns={columns || internalColumns}
            rowKey={(record) => record?.id}
            dataSource={data?.data}
            loading={loading}
            pagination={{
                pageSize: data?.meta?.per_page,
                current: data?.meta?.current_page,
                showSizeChanger: true,
                total: data?.meta?.total,
            }}
            bordered
            onChange={handleTableChange}
            scroll={{ x: 'max-content' }}
            locale={{
                emptyText: (
                    <div className="text-center">
                        <h3 className="text-2xl text-gray-500">No Data Found</h3>
                    </div>
                ),
            }}
            {...props}
        />
    );
};

export default TableUI;
