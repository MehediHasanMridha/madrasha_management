import Logo from '@/assets/images/logo.png';
import StaticBtn from '@/Components/UI/StaticBtn';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { formattedAmount } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { useCallback, useRef } from 'react';
import { FaPhone } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';

const FinalModalStepComponent = ({ data, fee, selectedRows, handleClose, loading, setModal, setLoading, setStep, year, comments }) => {
    console.log('🚀 ~ FinalModalStepComponent ~ fee:', fee);
    const academic_divider = (fee?.academic_fee / data?.academic_fee) | 0;
    const academic_division = fee?.academic_fee % data?.academic_fee | 0;
    const boarding_divider = (fee?.boarding_fee / data?.boarding_fee) | 0;
    const boarding_division = fee?.boarding_fee % data?.boarding_fee | 0;

    const printComponentRef = useRef(null);
    const currentDate = new Date();
    const { user } = usePage().props.auth;
    //  May 19, 2025 at 12:48 PM to  May 19, 2025 ও 12:48 PM
    const formattedDate = currentDate
        .toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        .replace('at', ' সময়:');

    const handleBeforePrint = useCallback(() => {
        setLoading(true);
        return Promise.resolve();
    }, []);

    const handleAfterPrint = () => {
        // handleClose();
        setLoading(false);
    };

    const printFn = useReactToPrint({
        contentRef: printComponentRef,
        documentTitle: `Receipt_${data?.unique_id}_${new Date().toISOString().split('T')[0]}`,
        onAfterPrint: handleAfterPrint,
        onBeforePrint: handleBeforePrint,
        // receipt page size is small & font size is small & print to printable area
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

    return (
        <div className="flex h-full flex-col space-y-4 px-2">
            {/* Printable Receipt Content */}
            <div className="space-y-4" ref={printComponentRef}>
                {/* স্কুল হেডার */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={Logo} alt="School Logo" className="h-12 print:h-[37px]" />
                        <div>
                            <h1 className="text-lg font-bold print:text-[20px]">মাদরাসাতুল হেরা টাঙ্গাইল</h1>
                            <p className="text-sm text-black print:text-[12px]">মনোয়ারা রশিদ ভিলা, রহমান ভবন, কোদালিয়া, টাঙ্গাইল</p>
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
                            <div className="text-lg font-semibold print:text-[12px]">মাসিক বেতন রসিদ</div>
                            <div className="text-sm text-black print:text-[10px]">তারিখ: {formattedDate}</div>
                        </div>
                    </div>
                )}

                {/* মাসিক ফি টেবিল */}
                {selectedRows && selectedRows.length > 0 && (
                    <div className="h-[200px] overflow-x-auto print:h-fit print:overflow-y-auto">
                        <table className="w-full min-w-full table-auto border-collapse">
                            <thead>
                                <tr>
                                    <th className="border-[0.5px] border-black px-4 py-2 text-left">ক্রমিক</th>
                                    <th className="border-[0.5px] border-black px-4 py-2 text-left">মাস ({year})</th>
                                    <th className="border-[0.5px] border-black px-4 py-2 text-right">বোর্ডিং ফি</th>
                                    <th className="border-[0.5px] border-black px-4 py-2 text-right">একাডেমিক ফি</th>
                                    <th className="border-[0.5px] border-black px-4 py-2 text-right">মোট</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedRows.map((row, index) => {
                                    const boarding_fee =
                                        index < boarding_divider ? row?.boarding_fee : index === boarding_divider ? boarding_division : 0;
                                    const academic_fee =
                                        index < academic_divider ? row?.academic_fee : index === academic_divider ? academic_division : 0;
                                    return (
                                        <tr key={index}>
                                            <td className="border-[0.5px] border-black px-4 py-2">{Number(index + 1).toLocaleString('bn')}</td>
                                            <td className="border-[0.5px] border-black px-4 py-2">
                                                {(() => {
                                                    const monthIndex =
                                                        typeof row.month === 'number' ? row.month - 1 : new Date(`${row.month} 1, 2000`).getMonth();
                                                    return new Date(2000, monthIndex, 1).toLocaleString('bn-BD', { month: 'long' });
                                                })()}
                                            </td>
                                            <td className="border-[0.5px] border-black px-4 py-2 text-right">{formattedAmount(boarding_fee || 0)}</td>
                                            <td className="border-[0.5px] border-black px-4 py-2 text-right">{formattedAmount(academic_fee || 0)}</td>
                                            <td className="border-[0.5px] border-black px-4 py-2 text-right">
                                                {formattedAmount((boarding_fee || 0) + (academic_fee || 0))}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* পেমেন্ট সারাংশ */}
                <div className="mt-6 flex justify-between rounded-[4px] border-[0.5px] border-[#131313] p-4">
                    <div className="w-full space-y-2">
                        <div className="flex justify-between">
                            <span>মোট:</span>
                            <span>{formattedAmount(Number(fee?.academic_fee) + Number(fee?.boarding_fee) || 0)} টাকা</span>
                        </div>
                        <div className="flex justify-between">
                            <span>ছাড়:</span>
                            <span>{formattedAmount(fee?.discount || 0)} টাকা</span>
                        </div>
                        <div className="flex justify-between">
                            <span>বাকী:</span>
                            <span>{formattedAmount(Number(fee?.academic_due) + Number(fee?.boarding_due) || 0)} টাকা</span>
                        </div>
                        <div className="flex justify-between border-t border-dashed pt-2 font-bold">
                            <span>সর্বমোট:</span>
                            <span>{formattedAmount((fee?.total || 0) - (fee?.discount || 0))} টাকা</span>
                        </div>
                        <div className="flex justify-between border-t border-dashed pt-2">
                            <span>পরিশোধিত:</span>
                            <span>{formattedAmount(Number(fee?.academic_fee) + Number(fee?.boarding_fee) || 0)} টাকা</span>
                        </div>
                    </div>
                </div>

                {/* মন্তব্য বিভাগ */}
                {comments && (
                    <div className="mt-6">
                        <h3 className="mb-2 font-medium">মন্তব্য</h3>
                        <p className="h-fit w-full rounded-[4px] border-[0.5px] border-[#131313] p-3 print:h-[50px]">{comments} </p>
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
