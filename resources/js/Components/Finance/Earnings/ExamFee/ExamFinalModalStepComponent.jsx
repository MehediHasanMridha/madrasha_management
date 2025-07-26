import ApplicationLogo from '@/Components/ApplicationLogo';
import StaticBtn from '@/Components/UI/StaticBtn';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { formattedAmount } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { useCallback, useRef } from 'react';
import { FaPhone } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';

const ExamFinalModalStepComponent = ({ data, fee, selectedRows, handleClose, loading, setLoading, year, comments }) => {
    const printComponentRef = useRef(null);
    const currentDate = new Date();
    const { user } = usePage().props.auth;
    const { institute } = usePage().props;

    // Format date to Bengali
    const formattedDate = currentDate
        .toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        .replace('at', ' সময়:');

    const handleBeforePrint = useCallback(() => {
        setLoading(true);
        return Promise.resolve();
    }, []);

    const handleAfterPrint = () => {
        setLoading(false);
    };

    const printFn = useReactToPrint({
        contentRef: printComponentRef,
        documentTitle: `Exam_Fee_Receipt_${data?.unique_id}_${new Date().toISOString().split('T')[0]}`,
        onAfterPrint: handleAfterPrint,
        onBeforePrint: handleBeforePrint,
        // Receipt page size is small & font size is small & print to printable area
        pageStyle: `
            @media print {
                @page {
                    size: A5;
                    margin: 32px;
                }
                body {
                    font-size: 12px;
                    margin: 0;
                    padding: 0;
                    line-height: 1.2;
                }
            }
        `,
    });

    // Calculate total exam fee
    const totalExamFee = selectedRows.reduce((total, row) => total + (row.fee || 0), 0);

    return (
        <div className="flex h-full flex-col space-y-4 px-2">
            {/* Printable Receipt Content */}
            <div className="space-y-4" ref={printComponentRef}>
                {/* স্কুল হেডার */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <ApplicationLogo className="h-[50px] w-[50px] print:h-[28px] print:w-[28px]" />
                        <div>
                            <h1 className="text-lg font-bold print:text-[20px]">{institute?.name_bangla || 'এখানে মাদরাসার নাম'}</h1>
                            <p className="text-sm text-black print:text-[12px]">{institute?.address || 'এখানে মাদরাসার ঠিকানা হবে'}</p>
                        </div>
                    </div>
                    <div className="text-right text-sm print:text-[10px]">
                        <div className="prtint:w-[100px] flex w-fit items-center justify-between gap-2">
                            <FaPhone className="h-[8px] w-[8px]" />
                            <span>০১৭৬৬-৯২৫২৬২</span>
                        </div>
                        <div className="prtint:w-[100px] flex w-fit items-center justify-between gap-2">
                            <FaPhone className="h-[8px] w-[8px]" />
                            <span>০১৭১৭-০৫২৭৯৩</span>
                        </div>
                    </div>
                </div>
                <hr className="print:border-[0.5px] print:border-black" />

                {/* শিক্ষার্থী তথ্য */}
                {data && (
                    <div className="flex items-center justify-between rounded-[8px]">
                        <div className="flex items-center space-x-4">
                            <img
                                src={getAvatarImage(data.image, 'student_images', data.name)}
                                alt="Student"
                                className="h-[50px] w-[50px] rounded-full border print:h-[28px] print:w-[28px]"
                            />
                            <div>
                                <p className="text-lg font-semibold print:text-[12px]">{data.name || 'N/A'}</p>
                                <p className="text-sm text-black print:text-[10px]">
                                    {data?.unique_id} • {data?.department}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-semibold print:text-[12px]">পরীক্ষার ফি রসিদ</div>
                            <div className="text-sm text-black print:text-[10px]">তারিখ: {formattedDate}</div>
                        </div>
                    </div>
                )}

                {/* পরীক্ষার ফি টেবিল */}
                {selectedRows && selectedRows.length > 0 && (
                    <div className="h-[200px] overflow-y-auto print:h-fit print:overflow-y-auto">
                        <table className="w-full min-w-full table-auto border-collapse">
                            <thead>
                                <tr>
                                    <th className="border-[0.5px] border-black px-4 py-2 text-left">ক্রমিক</th>
                                    <th className="border-[0.5px] border-black px-4 py-2 text-left">পরীক্ষার নাম</th>
                                    <th className="border-[0.5px] border-black px-4 py-2 text-right">ফি</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedRows.map((row, index) => (
                                    <tr key={index}>
                                        <td className="border-[0.5px] border-black px-4 py-2">{Number(index + 1).toLocaleString('bn')}</td>
                                        <td className="border-[0.5px] border-black px-4 py-2">{row.exam || 'N/A'}</td>
                                        <td className="border-[0.5px] border-black px-4 py-2 text-right">{formattedAmount(row.fee || 0)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* পেমেন্ট সারাংশ */}
                <div className="mt-6 flex justify-between rounded-[4px] border-[0.5px] border-[#131313] p-4">
                    <div className="w-full space-y-2">
                        <div className="flex justify-between">
                            <span>মোট:</span>
                            <span>{formattedAmount(totalExamFee)} টাকা</span>
                        </div>
                        <div className="flex justify-between">
                            <span>ছাড়:</span>
                            <span>{formattedAmount(fee?.discount || 0)} টাকা</span>
                        </div>
                        <div className="flex justify-between border-t border-dashed pt-2 font-bold">
                            <span>সর্বমোট:</span>
                            <span>{formattedAmount(totalExamFee - (fee?.discount || 0))} টাকা</span>
                        </div>
                        <div className="flex justify-between border-t border-dashed pt-2">
                            <span>পরিশোধিত:</span>
                            <span>{formattedAmount(totalExamFee)} টাকা</span>
                        </div>
                    </div>
                </div>

                {/* মন্তব্য বিভাগ */}
                {comments && (
                    <div className="mt-6">
                        <h3 className="mb-2 font-medium">মন্তব্য</h3>
                        <p className="h-fit w-full rounded-[4px] border-[0.5px] border-[#131313] p-3 print:h-[50px]">{comments}</p>
                    </div>
                )}

                <div className="flex items-center justify-center gap-2">
                    যোগ করেছেন :
                    <img
                        src={getAvatarImage(user?.img, 'staff_images', user?.name)}
                        alt=""
                        className="h-[20px] w-[20px] rounded-sm print:h-[10px] print:w-[10px]"
                    />
                    {user?.name} আইডি: {user?.unique_id}
                </div>
            </div>

            <div className="mt-auto flex w-full gap-[18px] pt-4 print:hidden">
                <StaticBtn
                    onClick={() => {
                        handleClose();
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

export default ExamFinalModalStepComponent;
