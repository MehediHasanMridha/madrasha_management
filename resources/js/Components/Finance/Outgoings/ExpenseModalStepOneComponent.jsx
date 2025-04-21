import StaticBtn from '@/Components/UI/StaticBtn';

const ExpenseModalStepOneComponent = ({ setStep, setType }) => {
    return (
        <div className="flex h-[500px] flex-col items-center justify-center space-y-4">
            <StaticBtn
                className="h-[100px] w-[440px] rounded-lg bg-[#F2F2F2] px-[8px] py-[6px] text-[#4A4A4A] hover:bg-[#4891FF] hover:text-white"
                onClick={() => {
                    setStep(2);
                    setType('salary');
                }}
            >
                Staff Salary
            </StaticBtn>
        </div>
    );
};

export default ExpenseModalStepOneComponent;
