import Field from '@/Components/UI/Field';
import StaticBtn from '@/Components/UI/StaticBtn';

const ModalStepTwoComponent = ({ studentId, setStudentId, setStep, getData }) => {
    return (
        <div className="h-[500px] space-y-4">
            <div className="flex h-[400px] flex-col items-center justify-center">
                <Field label="Student ID" className="w-full text-[#AFAFAF]">
                    <input
                        type="text"
                        className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-black focus:outline-0"
                        placeholder="Student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        name="student_id"
                    />
                </Field>
            </div>
            <div className="flex justify-between">
                <StaticBtn className="bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#48adff] hover:text-white" onClick={() => setStep(1)}>
                    Back
                </StaticBtn>
                {studentId ? (
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

export default ModalStepTwoComponent;
