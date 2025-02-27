import { Layout } from "antd";

const LayoutUI = ({ children }) => {
    const { Content, Footer, Header, Sider } = Layout;
    return <Layout>{children({ Content, Footer, Header, Sider })}</Layout>;
};

export default LayoutUI;
