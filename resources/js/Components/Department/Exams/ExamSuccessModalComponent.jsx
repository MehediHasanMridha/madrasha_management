import { CheckCircle } from 'lucide-react';

const ExamSuccessModalComponent = ({ examData, onClose, onCreateAnother }) => {
    return (
        <div className="flex flex-col items-center gap-6 p-8">
            {/* Success Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-500" />
            </div>

            {/* Success Message */}
            <div className="text-center">
                <h2 className="mb-2 text-2xl font-semibold text-[#131313]">Exam Created Successfully!</h2>
                <p className="text-base text-[#666666]">The exam "{examData?.examName}" has been created successfully.</p>
            </div>

            {/* Exam Details Summary */}
            <div className="w-full space-y-3 rounded-lg bg-[#F8F9FA] p-4">
                <div className="flex justify-between">
                    <span className="text-sm text-[#666666]">Exam Name:</span>
                    <span className="text-sm font-medium text-[#131313]">{examData?.examName}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#666666]">Start Date:</span>
                    <span className="text-sm font-medium text-[#131313]">{examData?.startDate}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#666666]">End Date:</span>
                    <span className="text-sm font-medium text-[#131313]">{examData?.endDate}</span>
                </div>
                {examData?.examFee && examData.examFee !== '0' && (
                    <div className="flex justify-between">
                        <span className="text-sm text-[#666666]">Exam Fee:</span>
                        <span className="text-sm font-medium text-[#131313]">{examData.examFee} BDT</span>
                    </div>
                )}
                <div className="flex justify-between">
                    <span className="text-sm text-[#666666]">Classes:</span>
                    <span className="text-sm font-medium text-[#131313]">{examData?.selectedClasses?.map((c) => c.name).join(', ')}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full gap-4">
                <button
                    onClick={onCreateAnother}
                    className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#F2F2F2] px-4 py-3 text-base font-normal text-[#4A4A4A] transition-colors hover:bg-gray-300"
                >
                    Create Another
                </button>
                <button
                    onClick={onClose}
                    className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#0267FF] px-4 py-3 text-base font-normal text-white transition-colors hover:bg-blue-600"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default ExamSuccessModalComponent;
