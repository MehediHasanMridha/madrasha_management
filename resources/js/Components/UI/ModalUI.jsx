import { Modal } from 'antd';

const ModalUI = ({ isModalOpen = false, handleOk = () => {}, handleCancel = () => {}, className = '', footer = null, width, children, ...props }) => {
    return (
        <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            className={className}
            width={width || 800}
            footer={footer}
            style={{ top: 20 }}
            centered
            modalRender={false} // This is a placeholder, you can customize the modal render if needed
            {...props}
        >
            {children}
        </Modal>
    );
};

export default ModalUI;
