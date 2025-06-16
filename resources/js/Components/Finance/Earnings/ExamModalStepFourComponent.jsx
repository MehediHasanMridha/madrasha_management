import StaticBtn from '@/Components/UI/StaticBtn';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

const ExamModalStepFourComponent = ({ setStep, selectedRows, loading, data, handleClose, setComments, comments }) => {
    const { user } = usePage().props.auth;
    return (
        <div className="space-y-3">
            {/* Student Admit Card Download Section */}
            <div className="flex items-center justify-between rounded-lg bg-[#F2F2F2] p-3">
                <span className="text-base font-normal text-[#4A4A4A]">Student admit card</span>
                <div className="flex items-center gap-2 rounded px-3 py-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5"
                            stroke="#0267FF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="text-sm font-normal text-[#0267FF]">Download</span>
                </div>
            </div>

            {/* Student Information Section */}
            <div className="flex items-center gap-3.5 rounded-lg bg-[#F2F2F2] p-3">
                <div className="h-[50px] w-[50px] overflow-hidden rounded-full bg-[#D9D9D9]">
                    <img
                        src={getAvatarImage(data.image, 'student_images', data.name)}
                        alt="Student"
                        className="h-[50px] w-[50px] rounded-full border"
                    />
                    <div className="hidden h-full w-full bg-[#D9D9D9]"></div>
                </div>
                <div className="flex-1 space-y-0.5">
                    <div className="text-base font-medium text-[#131313]">{data.name}</div>
                    <div className="text-sm font-normal text-[#4A4A4A]">{data.unique_id}</div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-normal text-[#4A4A4A]">Payment date</span>
                    <span className="text-sm font-normal text-[#4A4A4A]">:</span>
                    <span className="text-sm font-medium text-[#131313]">{new Date().toLocaleDateString()}</span>
                </div>
            </div>

            {/* Exam Fees Table */}
            <div className="rounded-lg border border-[#AFAFAF]">
                {/* Table Header */}
                <div className="flex border-b border-[#AFAFAF] bg-[#F2F2F2]">
                    <div className="w-14 border-r border-[#AFAFAF] p-3">
                        <span className="text-sm font-normal text-[#131313]">S/N</span>
                    </div>
                    <div className="flex-1 border-r border-[#AFAFAF] p-3">
                        <span className="text-sm font-normal text-[#131313]">Exam fee</span>
                    </div>
                    <div className="flex-1 p-3">
                        <span className="text-sm font-normal text-[#131313]">Amount</span>
                    </div>
                </div>

                {/* Table Body */}
                {selectedRows.map((fee, index) => (
                    <div key={index} className="flex border-b border-[#AFAFAF] last:border-b-0">
                        <div className="w-14 border-r border-[#AFAFAF] p-3">
                            <span className="text-sm font-normal text-[#4A4A4A]">{fee.key}</span>
                        </div>
                        <div className="flex-1 border-r border-[#AFAFAF] p-3">
                            <span className="text-sm font-normal text-[#4A4A4A]">{fee.exam}</span>
                        </div>
                        <div className="flex-1 p-3">
                            <span className="block text-right text-sm font-normal text-[#4A4A4A]">{fee.fee}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Section */}
            <div className="rounded-lg bg-[#F2F2F2] p-3">
                <div className="flex items-center justify-between">
                    <span className="text-base font-normal text-[#4A4A4A]">Total :</span>
                    <div className="flex w-[120px] items-center justify-end rounded px-3">
                        <span className="text-base font-normal text-[#4A4A4A]">{selectedRows.reduce((total, fee) => total + fee.fee, 0)} BDT</span>
                    </div>
                </div>
            </div>

            {/* Comment Section */}
            <div className="space-y-2 rounded-lg bg-[#F2F2F2] p-3">
                <div className="text-sm font-normal text-[#AFAFAF]">Comment</div>
                <textarea
                    rows="2"
                    placeholder="Type your comment here"
                    cols={'20'}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full text-base font-normal text-[#4A4A4A] focus:outline-none"
                >
                    {comments}
                </textarea>
            </div>

            {/* Added By Section */}
            <div className="flex items-center justify-center gap-2.5">
                <span className="text-sm font-normal text-[#4A4A4A]">This receipt is added by :</span>
                <div className="h-8 w-8 overflow-hidden rounded-full">
                    <img src={getAvatarImage(user?.image, 'staff_images', user?.name)} alt="Admin" className="h-full w-full object-cover" />
                </div>
                <span className="text-sm font-medium text-[#131313]">{user?.name}</span>
                <span className="text-sm text-[#AFAFAF]">(ID : {user?.unique_id || 'N/A'})</span>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-5 flex w-full gap-[18px]">
                <StaticBtn
                    onClick={() => setStep(3)}
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#0267FF] hover:text-white"
                    disabled={loading}
                >
                    Back
                </StaticBtn>
                <StaticBtn
                    onClick={() => {
                        if (selectedRows.length === 0) return;
                        setStep((prev) => prev + 1);
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

export default ExamModalStepFourComponent;
