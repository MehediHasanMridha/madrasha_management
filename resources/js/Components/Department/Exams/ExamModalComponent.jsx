import ModalUI from '@/Components/UI/ModalUI';

const ExamModalComponent = ({ modal, handleCancel, content, title = 'Add exam' }) => {
    return (
        <ModalUI
            title={<h1 className="border-b border-[#AFAFAF] pb-3 text-[20px] font-semibold text-[#111827]">{title}</h1>}
            handleCancel={handleCancel}
            isModalOpen={modal}
            width={800}
            footer={null}
        >
            {content}
        </ModalUI>
    );
};

export default ExamModalComponent;
