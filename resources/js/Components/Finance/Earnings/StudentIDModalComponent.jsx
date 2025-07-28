import Field from '@/Components/UI/Field';
import StaticBtn from '@/Components/UI/StaticBtn';
import { cn } from '@/lib/utils';

const StudentIDModalComponent = ({ studentId, setStudentId, setStep, getData, loading }) => {
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
            <div className="mt-5 flex w-full gap-[18px]">
                <StaticBtn
                    onClick={() => {
                        setStep((prev) => prev - 1);
                        setStudentId('');
                    }}
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#0267FF] hover:text-white"
                    disabled={loading}
                >
                    Back
                </StaticBtn>
                <StaticBtn
                    onClick={() => {
                        if (!studentId) return;
                        setStep((prev) => prev + 1);
                        getData();
                    }}
                    className={cn(
                        'flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#0267FF] text-white',
                        !studentId && 'cursor-not-allowed opacity-50',
                    )}
                >
                    {loading ? 'Processing...' : 'Next'}
                </StaticBtn>
            </div>
        </div>
    );
};

export default StudentIDModalComponent;
