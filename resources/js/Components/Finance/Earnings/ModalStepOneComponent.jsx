import StaticBtn from '@/Components/UI/StaticBtn';

const ModalStepOneComponent = ({ setStep, setType }) => {
    return (
        <div className="flex h-[500px] flex-col items-center justify-center space-y-4">
            <StaticBtn
                className="h-[100px] w-[440px] rounded-lg bg-[#F2F2F2] px-[8px] py-[6px] text-[#4A4A4A] hover:bg-[#4891FF] hover:text-white"
                onClick={() => {
                    setStep(2);
                    setType('monthly_fee');
                }}
            >
                Monthly Fee
            </StaticBtn>
            <StaticBtn
                className="h-[100px] w-[440px] rounded-lg bg-[#F2F2F2] px-[8px] py-[6px] text-[#4A4A4A] hover:bg-[#4891FF] hover:text-white"
                onClick={() => {
                    setStep(2);
                    setType('exam_fee');
                }}
            >
                Exam Fee
            </StaticBtn>
            {/* <StaticBtn
                className="h-[100px] w-[440px] rounded-lg bg-[#F2F2F2] px-[8px] py-[6px] text-[#4A4A4A] hover:bg-[#4891FF] hover:text-white"
                onClick={() => {
                    setStep(2);
                    setType('others_fee');
                }}
            >
                Other Fee
            </StaticBtn> */}
        </div>
    );
};

export default ModalStepOneComponent;
