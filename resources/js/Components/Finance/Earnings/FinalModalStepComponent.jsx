import StaticBtn from '@/Components/UI/StaticBtn';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { formattedAmount } from '@/lib/utils';
import { useCallback, useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';

const FinalModalStepComponent = ({ data, fee, selectedRows, handleClose, loading, setModal, setLoading, setStep }) => {
    const printComponentRef = useRef(null);

    const handleBeforePrint = useCallback(() => {
        setLoading(true);
        return Promise.resolve();
    }, []);

    const handleAfterPrint = () => {
        handleClose();
        setLoading(false);
    };

    const printFn = useReactToPrint({
        contentRef: printComponentRef,
        documentTitle: 'AwesomeFileName',
        onAfterPrint: handleAfterPrint,
        onBeforePrint: handleBeforePrint,
        pageStyle: 'print',
    });
    return (
        <div className="flex h-full flex-col space-y-4 px-2">
            {/* Success Header */}
            <div className="flex flex-col items-center justify-center space-y-3 py-5">
                <FaCheckCircle className="h-16 w-16 text-green-500" />
                <h2 className="text-xl font-semibold text-[#111827]">Payment Successful!</h2>
                <p className="text-sm text-[#4A4A4A]">Transaction ID: {Math.random().toString(36).substring(2, 12).toUpperCase()}</p>
            </div>

            {/* Student Info */}
            {data && (
                <div className="rounded-[8px] bg-[#F2F2F2] p-4">
                    <div className="flex items-center space-x-4">
                        <img
                            src={getAvatarImage(data.image, 'student_images', data.name)}
                            alt="Student"
                            className="h-[50px] w-[50px] rounded-full border"
                        />
                        <div>
                            <p className="text-lg font-semibold">{data.name || 'N/A'}</p>
                            <p className="text-sm text-gray-600">Student ID: {data.unique_id}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-4" ref={printComponentRef}>
                {/* Payment Details */}
                <div className="rounded-[8px] border border-[#AFAFAF] p-4">
                    <h3 className="mb-3 font-medium">Payment Details</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Academic Fee:</span>
                            <span>{formattedAmount(fee?.academic_fee || 0)} BDT</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Boarding Fee:</span>
                            <span>{formattedAmount(fee?.boarding_fee || 0)} BDT</span>
                        </div>
                        {fee?.discount > 0 && (
                            <div className="flex justify-between">
                                <span>Discount:</span>
                                <span>-{formattedAmount(fee?.discount || 0)} BDT</span>
                            </div>
                        )}
                        <hr className="my-2 border-dashed border-[#AFAFAF]" />
                        <div className="flex justify-between font-medium">
                            <span>Total Paid:</span>
                            <span>{formattedAmount(fee?.total || 0)} BDT</span>
                        </div>
                    </div>
                </div>

                {/* Months Paid */}
                {selectedRows && selectedRows.length > 0 && (
                    <div className="rounded-[8px] border border-[#AFAFAF] p-4">
                        <h3 className="mb-2 font-medium">Months Paid</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedRows.map((row, index) => (
                                <span key={index} className="rounded-full bg-[#E6F0FF] px-3 py-1 text-xs text-[#0267FF]">
                                    {row.month}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Due Information */}
                <div className="rounded-[8px] bg-[#F2F2F2] p-4">
                    <div className="flex justify-between">
                        <span>Academic Due:</span>
                        <span>{formattedAmount(fee?.academic_due || 0)} BDT</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Boarding Due:</span>
                        <span>{formattedAmount(fee?.boarding_due || 0)} BDT</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex w-full gap-[18px] pt-4">
                <StaticBtn
                    onClick={() => {
                        handleClose();
                        setModal(false);
                    }}
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#0267FF] hover:text-white"
                >
                    Close
                </StaticBtn>
                <StaticBtn
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#0267FF] text-white"
                    onClick={printFn}
                >
                    {loading ? 'generating...' : 'Print Receipt'}
                </StaticBtn>
            </div>
        </div>
    );
};

export default FinalModalStepComponent;
