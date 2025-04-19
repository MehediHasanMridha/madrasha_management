import RenderStepContentContainer from '@/Container/Finance/Earnings/RenderStepContentContainer';
import ModalUI from '../UI/ModalUI';

const ModalComponent = ({ modal, setModal, step, setStep, closeModal }) => {
    return (
        <ModalUI title={<h1 className="text-[20px] font-semibold text-[#111827]">Add Money</h1>} handleCancel={closeModal} isModalOpen={modal}>
            <RenderStepContentContainer step={step} setStep={setStep} setModal={setModal} />
        </ModalUI>
    );
};

export default ModalComponent;
