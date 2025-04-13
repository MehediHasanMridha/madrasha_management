import { Popconfirm } from 'antd';

const Confirmpop = ({ children, loading = false, open = false, handleOk = () => {}, handleCancel = () => {}, ...props }) => {
    return (
        <Popconfirm
            title="Title"
            description="Open Popconfirm with async logic"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{ loading }}
            onCancel={handleCancel}
            {...props}
        >
            {children}
        </Popconfirm>
    );
};

export default Confirmpop;
