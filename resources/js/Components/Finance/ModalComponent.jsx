import ModalUI from '@/Components/UI/ModalUI';

const ModalComponent = ({ modal, setModal, content }) => {
    return (
        <ModalUI
            title={<h1 className="text-[20px] font-semibold text-[#111827]">Add Money</h1>}
            handleCancel={() => setModal(false)}
            isModalOpen={modal}
        >
            {content}
        </ModalUI>
    );
};

export default ModalComponent;
