import ModalUI from '@/Components/UI/ModalUI';

const ModalContainer = ({ modal, setModal }) => {
    const closeModal = () => {
        setModal(false);
    };
    return (
        <ModalUI title={<h1 className="text-[20px] font-semibold text-[#111827]">Add Money</h1>} handleCancel={closeModal} isModalOpen={modal}>
            sdfljlsdf
        </ModalUI>
    );
};

export default ModalContainer;
