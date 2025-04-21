import Field from '@/Components/UI/Field';
import StaticBtn from '@/Components/UI/StaticBtn';

const ExpenseModalStepTwoComponent = ({ staffId, setStaffId, setStep, getData }) => {
    return (
        <div className="h-[500px] space-y-4">
            <div className="flex h-[400px] flex-col items-center justify-center">
                <Field label="Staff ID" className="w-full text-[#AFAFAF]">
                    <input
                        type="text"
                        className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-black focus:outline-0"
                        placeholder="Staff ID"
                        value={staffId}
                        onChange={(e) => setStaffId(e.target.value)}
                        name="staff_id"
                    />
                </Field>
            </div>
            <div className="flex justify-between">
                <StaticBtn className="bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#48adff] hover:text-white" onClick={() => setStep(1)}>
                    Back
                </StaticBtn>
                {staffId ? (
                    <StaticBtn
                        onClick={() => {
                            setStep(3);
                            getData();
                        }}
                    >
                        Next
                    </StaticBtn>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default ExpenseModalStepTwoComponent;
