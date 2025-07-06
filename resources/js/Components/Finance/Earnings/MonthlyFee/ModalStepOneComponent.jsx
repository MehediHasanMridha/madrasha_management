import StaticBtn from '@/Components/UI/StaticBtn';
import StudentMonthlyFeeListTableContainer from '@/Container/Finance/Earnings/StudentMonthlyFeeListTableContainer';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { cn } from '@/lib/utils';

const ModalStepOneComponent = ({
    data,
    setStep,
    setMonthlyFeeStep,
    year,
    setYear,
    fee,
    setFee,
    setSelectedRows,
    selectedRows,
    getData,
    loading,
    setSelectedDueData,
}) => {
    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between rounded-[8px] bg-[#F2F2F2] p-[12px]">
                    <div className="flex items-center space-x-4">
                        <img
                            src={getAvatarImage(data?.image, 'student_images', data?.name)}
                            alt="Student"
                            className="h-[50px] w-[50px] rounded-full border"
                        />
                        <div>
                            <p className="text-lg font-semibold">{data?.name || 'N/A'}</p>
                            <p className="text-sm text-gray-600">Student ID: {data?.unique_id}</p>
                        </div>
                    </div>
                    <div>
                        <span>
                            Boarding fee: <span className="font-semibold text-black">{data?.boarding_fee}BDT</span>
                        </span>
                        <br />
                        <span>
                            Academic fee: <span className="font-semibold text-black">{data?.academic_fee}BDT</span>
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between border-b border-[#AFAFAF] pb-[12px]">
                    <span className="text-[16px] font-semibold">Monthly fee details</span>
                    <select
                        className="w-[78px] cursor-pointer rounded-[4px] border-[1px] border-[#AFAFAF] px-[8px] py-[4px] text-black focus:outline-0"
                        value={year}
                        onChange={(e) => {
                            setYear(e.target.value);
                            getData(e.target.value);
                        }}
                    >
                        <option disabled>Year</option>
                        {['2025', '2026', '2027', '2028', '2029', '2030'].map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="h-[400px] overflow-y-auto">
                    <StudentMonthlyFeeListTableContainer
                        data={data}
                        setFee={setFee}
                        setSelectedRows={setSelectedRows}
                        selectedRows={selectedRows}
                        fee={fee}
                        setMonthlyFeeStep={setMonthlyFeeStep}
                        setSelectedDueData={setSelectedDueData}
                    />
                </div>
                <div className="space-y-[8px] rounded-[8px] bg-[#F2F2F2] p-[12px]">
                    <div className="flex justify-between font-semibold">
                        <span>Total Fee:</span>
                        <span>{Number(fee.total)} TK</span>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex w-full gap-[18px]">
                <StaticBtn
                    onClick={() => setStep((prev) => prev - 1)}
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#0267FF] hover:text-white"
                    disabled={loading}
                >
                    Back
                </StaticBtn>
                <StaticBtn
                    onClick={() => {
                        if (selectedRows.length === 0) return;
                        setMonthlyFeeStep(2);
                    }}
                    className={cn(
                        'flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#0267FF] text-white',
                        selectedRows.length === 0 && 'cursor-not-allowed opacity-50',
                    )}
                >
                    {loading ? 'Processing...' : 'Next'}
                </StaticBtn>
            </div>
        </>
    );
};

export default ModalStepOneComponent;
