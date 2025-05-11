import StaticBtn from '@/Components/UI/StaticBtn';

const ExpenseModalStepOneComponent = ({ setStep, setType }) => {
    return (
        <div className="flex h-[500px] flex-col items-center justify-center space-y-4">
            <StaticBtn
                className="h-[100px] w-[440px] rounded-lg bg-[#F2F2F2] px-[8px] py-[6px] text-[#4A4A4A] hover:bg-[#4891FF] hover:text-white"
                onClick={() => {
                    setType('salary');
                    setStep((prev) => prev + 1);
                }}
            >
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-lg font-medium">Salary</span>
                    <span className="text-center text-sm">Staff and teacher salary payments</span>
                </div>
            </StaticBtn>
            <StaticBtn
                className="h-[100px] w-[440px] rounded-lg bg-[#F2F2F2] px-[8px] py-[6px] text-[#4A4A4A] hover:bg-[#4891FF] hover:text-white"
                onClick={() => {
                    setType('others');
                    setStep((prev) => prev + 1);
                }}
            >
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-lg font-medium">Other Expense</span>
                    <span className="text-center text-sm">Utility bills, maintenance, supplies, etc.</span>
                </div>
            </StaticBtn>
        </div>
    );
};

export default ExpenseModalStepOneComponent;
