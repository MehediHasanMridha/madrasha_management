import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import StaticBtn from '@/Components/UI/StaticBtn';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';

const ModalStepThreeComponent = ({ data, loading, setStep, month, setMonth, fee, setFee, submitData }) => {
    const renderStudentInfo = () => (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <img src={getAvatarImage(data.image, 'student_images', data.name)} alt="Student" className="h-16 w-16 rounded-full border" />
                <div>
                    <p className="text-lg font-semibold">{data.name || 'N/A'}</p>
                    <p className="text-sm text-gray-600">Student ID: {data.unique_id}</p>
                </div>
            </div>
            <Field label="Select Month">
                <select
                    id="month"
                    name="month"
                    className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-black focus:outline-0"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                >
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
                        (m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ),
                    )}
                </select>
            </Field>
            <FieldSet>
                <Field label="Boarding fee :">
                    <input
                        type="text"
                        placeholder="Boarding fee"
                        className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-black focus:outline-0"
                        value={fee.boarding_fee}
                        onChange={(e) =>
                            setFee({ ...fee, boarding_fee: Number(e.target.value), boarding_due: Number(data.boarding_fee) - Number(e.target.value) })
                        }
                    />
                </Field>
                <Field label="Academic fee :">
                    <input
                        type="text"
                        placeholder="Academic fee"
                        className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-black focus:outline-0"
                        value={fee.academic_fee}
                        onChange={(e) =>
                            setFee({ ...fee, academic_fee: Number(e.target.value), academic_due: Number(data.academic_fee) - Number(e.target.value) })
                        }
                    />
                </Field>
            </FieldSet>
            <div className="space-y-[8px] rounded-[8px] bg-[#F2F2F2] p-[12px]">
                <div className="flex justify-between font-semibold">
                    <span>Total Fee:</span>
                    <span>{Number(fee.boarding_fee + fee.academic_fee)} TK</span>
                </div>
                <hr />
                <div className="flex justify-between">
                    <span>Due:</span>
                    <span>{Number(data.academic_fee) + Number(data.boarding_fee) - Number(fee.boarding_fee + fee.academic_fee)} TK</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-[500px] space-y-4">
            {loading ? <div>Loading...</div> : data ? renderStudentInfo() : <div>No data found</div>}
            <div className="absolute bottom-12 left-0 flex w-full justify-between px-2">
                <StaticBtn onClick={() => setStep(2)}>Previous</StaticBtn>
                <StaticBtn onClick={submitData}>Next</StaticBtn>
            </div>
        </div>
    );
};

export default ModalStepThreeComponent;
