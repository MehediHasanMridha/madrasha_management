import { ConfigProvider, Tabs } from "antd";
import React from "react";

const TabsUI = ({
  items,
  handleChange = () => {},
    tabPosition = "top",
  internalItems = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ],
  theme = {
    token: {
      borderRadiusLG: 0,
    },
    components: {
      Tabs: {
        itemSelectedColor: "#fe4e00",
        inkBarColor: "#fe4e00",
        titleFontSize: "30px",
        itemColor: "#666666",
        itemHoverColor: "#fe4e00",
        fontSize: "20px",
      },
    },
  },
  ...props
}) => {
  return (
    <ConfigProvider theme={theme}>
      <Tabs
        items={items || internalItems}
        onChange={handleChange}
        tabPosition={tabPosition}
        centered
        indicator={{
          size: (origin) => origin + 100,
          align: "center",
        }}
        tabBarGutter={100}
        destroyInactiveTabPane
        tabBarStyle={{
          margin: "auto",
        }}
        {...props}
      />
    </ConfigProvider>
  );
};

export default TabsUI;
