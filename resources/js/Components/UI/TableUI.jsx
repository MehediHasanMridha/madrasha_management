import { SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

const TableUI = ({
  dataSource,
  columns,
  deleteLoading = false,
  routeName,
  rowSelection = false,
    sortOrder = "asc",
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dataSource?.total]);
  const handleTableChange = (pagination, filters, sorter) => {
    console.log("🚀 ~ handleTableChange ~ sorter:", sorter);
    console.log("🚀 ~ handleTableChange ~ filters:", filters);
    console.log("🚀 ~ handleTableChange ~ pagination:", pagination);
    // router.get(
    //   route(routeName, {
    //     page: pagination.current,
    //     per_page: pagination.pageSize,
    //     sort_field: sorter?.field,
    //     order:
    //       sorter?.order === "ascend"
    //         ? "asc"
    //         : sorter?.order === "descend"
    //         ? "desc"
    //         : undefined,
    //     filters: { ...filters },
    //   }),
    //   {},
    //   {
    //     onStart: () => {
    //       setLoading(true);
    //     },
    //   }
    // );
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="p-2" onKeyDown={(e) => e.stopPropagation()}>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                hoverBorderColor: "transparent",
                activeBorderColor: "transparent",
              },
              Button: {
                defaultHoverColor: "#1AA2A2",
                defaultHoverBorderColor: "#1AA2A2",
              },
            },
            token: { colorPrimaryActive: "#1AA2A2" },
          }}
        >
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            className="mb-[8px] hover:border-[#1AA2A2] focus:outline-none focus:ring-0 border-[1px] border-[#1AA2A2] rounded-md"
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
    filterIcon: (filtered) => (
      <SearchOutlined className="text-[#1AA2A2] cursor-pointer text-xl" />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    defaultSortOrder:
      sortOrder === "asc"
        ? "ascend"
        : sortOrder === "desc"
        ? "descend"
        : undefined,
  });

  const internalDataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const internalColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
        {
          text: "Submenu",
          value: "Submenu",
          children: [{ text: "Green", value: "Green" }],
        },
      ],
      filteredValue: ["Jim"],
      filterIcon: (filtered) => {
        console.log("🚀 ~ filtered:", filtered);
        return (
          <FaFilter className={`text-xl ${filtered ? "text-red-500" : ""}`} />
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <span className="cursor-pointer text-xl">Edit</span>
          <span className="text-red-500 cursor-pointer text-xl">Delete</span>
        </div>
      ),
    },
  ];

  return (
    <Table
      rowSelection={rowSelection && { type: "checkbox" }}
      columns={columns || internalColumns}
      rowKey={(record) => record?.id}
      dataSource={dataSource || internalDataSource}
      loading={deleteLoading ? { spinning: true } : loading}
      pagination={{
        pageSize: dataSource?.per_page,
        current: dataSource?.current_page,
        showSizeChanger: true,
        total: dataSource?.total,
      }}
      onChange={handleTableChange}
      scroll={{ x: "max-content" }}
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
