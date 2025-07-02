import StaticBtn from '@/Components/UI/StaticBtn';
import StudentExamFeeListTableContainer from '@/Container/Finance/Earnings/StudentExamFeeListTableContainer';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { cn } from '@/lib/utils';

const ExamModalStepOneComponent = ({
    data,
    loading,
    setStep,
    setExamFeeStep,
    year,
    setYear,
    fee,
    setFee,
    setSelectedRows,
    selectedRows,
    getData,
}) => {
    return (
        <div>
            <div className="space-y-6">
                {/* Student Info Card */}
                <div className="flex items-center justify-between rounded-[8px] bg-[#F2F2F2] p-[12px]">
                    <div className="flex items-center gap-[14px]">
                        <img
                            src={getAvatarImage(data.image, 'student_images', data.name)}
                            alt="Student"
                            className="h-[50px] w-[50px] rounded-full border"
                        />
                        <div className="flex flex-col gap-0.5">
                            <p className="text-[16px] leading-[1.5em] font-[500] text-[#131313]">{data.name || 'N/A'}</p>
                            <p className="text-[14px] leading-[1.5em] font-[400] text-[#4A4A4A]">{data.unique_id || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[12px] leading-[1.5em] font-[400] text-[#4A4A4A]">Total Exam fee</span>
                        <span className="text-[12px] leading-[1.5em] font-[400] text-[#4A4A4A]">:</span>
                        <span className="text-[14px] leading-[1.5em] font-[500] text-[#131313]">
                            {selectedRows?.reduce((total, row) => total + row.fee, 0)} BDT
                        </span>
                    </div>
                </div>

                {/* Exam Fee Details Section */}
                <div className="rounded-[8px] border-[0.5px] border-[#AFAFAF]">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#AFAFAF] p-[12px]">
                        <span className="text-[16px] leading-[1.5em] font-[500] text-[#131313]">Exam fee details</span>
                        <select
                            className="flex cursor-pointer items-center gap-2 rounded-[4px] border border-[#AFAFAF] px-2 py-1 focus:outline-none"
                            value={year}
                            onChange={(e) => {
                                setYear(e.target.value);
                                getData(e.target.value);
                            }}
                        >
                            <option value="">Select Year</option>
                            {['2024', '2025', '2026', '2027', '2028', '2029', '2030'].map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-b-[8px]">
                        <StudentExamFeeListTableContainer
                            data={data?.exam_data || []}
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                        />
                    </div>
                </div>

                {/* Total Fee Summary */}
                <div className="space-y-[8px] rounded-[8px] bg-[#F2F2F2] p-[12px]">
                    <div className="flex justify-between font-semibold">
                        <span>Selected Exam Fees:</span>
                        <span>{selectedRows?.length} exam(s)</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total Fee:</span>
                        <span>{selectedRows?.reduce((total, row) => total + row.fee, 0)} BDT</span>
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
                        setExamFeeStep((prev) => prev + 1);
                    }}
                    className={cn(
                        'flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#0267FF] text-white',
                        selectedRows.length === 0 && 'cursor-not-allowed opacity-50',
                    )}
                >
                    {loading ? 'Processing...' : 'Next'}
                </StaticBtn>
            </div>
        </div>
    );
};

export default ExamModalStepOneComponent;
