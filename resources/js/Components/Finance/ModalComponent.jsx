import ModalUI from '@/Components/UI/ModalUI';

const ModalComponent = ({ modal, setModal, content }) => {
    return (
        <ModalUI
            title={
                <h1 className="border-b border-[#AFAFAF] text-[20px] font-semibold text-[#111827]">
                    {route().current('finance.earnings') ? 'Add Money' : 'Add Voucher'}
                </h1>
            }
            handleCancel={() => setModal(false)}
            isModalOpen={modal}
            style={{ top: 0 }}
        >
            {content}
        </ModalUI>
    );
};

export default ModalComponent;
