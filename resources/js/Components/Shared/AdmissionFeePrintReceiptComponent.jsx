import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { usePage } from '@inertiajs/react';
import { forwardRef } from 'react';
import { FaPhone } from 'react-icons/fa6';
import ApplicationLogo from '../ApplicationLogo';
const AdmissionFeePrintReceiptComponent = forwardRef((props, ref) => {
    const { data, student, month = '', admissionFee, comments, receiver, collectedMonthlyFeeForPrint } = props;
    const details = data?.details && (typeof data.details === 'string' ? JSON.parse(data.details) : data.details);
    const formattedDate = new Date()
        .toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        .replace('at', ' সময়:');
    const { user } = usePage().props.auth;
    const { institute } = usePage().props;

    const selectedMonth = month || details?.data?.month;

    return (
        <div className="space-y-4" ref={ref}>
            {/* স্কুল হেডার */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <ApplicationLogo alt="School Logo" className="h-12 print:h-[37px]" />
                    <div>
                        <h1 className="text-lg font-bold print:text-[20px]">{institute?.name_bangla || 'এখানে মাদরাসার নায়া'}</h1>
                        <p className="text-sm text-black print:text-[12px]">{institute?.address || 'এখানে মাদরাসার ঠিকানা'}</p>
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
            {student && (
                <div className="flex items-center justify-between rounded-[8px]">
                    <div className="flex items-center space-x-4">
                        <img
                            src={getAvatarImage(student?.image, 'student_images', student?.name)}
                            alt="Student"
                            className="h-[50px] w-[50px] rounded-full border print:h-[28px] print:w-[28px]"
                        />
                        <div>
                            <p className="text-lg font-semibold print:text-[12px]">{student.name || 'N/A'}</p>
                            <p className="text-sm text-black print:text-[10px]">
                                {student?.unique_id} • {student?.department}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-semibold print:text-[12px]">ভর্তি রসিদ</div>
                        <div className="text-sm text-black print:text-[10px]">তারিখ: {formattedDate}</div>
                    </div>
                </div>
            )}

            {/* মাসিক ফি টেবিল */}
            <div className="h-fit overflow-x-auto print:h-fit print:overflow-y-auto">
                <table className="w-full min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="w-[20px] border-[0.5px] border-black px-4 py-2 text-left">ক্রমিক</th>
                            <th className="border-[0.5px] border-black px-4 py-2 text-left">ফি</th>
                            <th className="w-[150px] border-[0.5px] border-black px-4 py-2 text-right">টাকা</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-[0.5px] border-black px-4 py-2">{Number(1).toLocaleString('bn')}</td>
                            <td className="border-[0.5px] border-black px-4 py-2">আডমিশন ফি</td>
                            <td className="border-[0.5px] border-black px-4 py-2 text-right">
                                {Number(admissionFee || details?.data?.admissionFee || 0).toLocaleString('bn')}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {selectedMonth && (
                <div className="h-[200px] overflow-x-auto print:h-fit print:overflow-y-auto">
                    <table className="w-full min-w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="w-[20px] border-[0.5px] border-black px-4 py-2 text-left">ক্রমিক</th>
                                <th className="border-[0.5px] border-black px-4 py-2 text-left">মাস({new Date().getFullYear()})</th>
                                <th className="w-[150px] border-[0.5px] border-black px-4 py-2 text-right">টাকা</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-[0.5px] border-black px-4 py-2">{Number(1).toLocaleString('bn')}</td>
                                <td className="border-[0.5px] border-black px-4 py-2">
                                    {month ? new Date(selectedMonth).toLocaleString('bn', { month: 'long' }) : selectedMonth}
                                </td>
                                <td className="border-[0.5px] border-black px-4 py-2 text-right">
                                    {Number(collectedMonthlyFeeForPrint || details?.data?.monthly_fee).toLocaleString('bn')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* পেমেন্ট সারাংশ */}
            <div className="mt-6 flex justify-between rounded-[4px] border-[0.5px] border-[#131313] p-4">
                <div className="w-full space-y-2">
                    <div className="flex justify-between">
                        <span>মোট:</span>
                        <span>
                            {(
                                Number(admissionFee || details?.data?.admissionFee || 0) +
                                Number(collectedMonthlyFeeForPrint || details?.data?.monthly_fee || 0)
                            ).toLocaleString('bn')}{' '}
                            টাকা
                        </span>
                    </div>
                    <div className="flex justify-between border-t border-dashed pt-2">
                        <span>পরিশোধিত:</span>
                        <span>
                            {(
                                Number(admissionFee || details?.data?.admissionFee || 0) +
                                Number(collectedMonthlyFeeForPrint || details?.data?.monthly_fee || 0)
                            ).toLocaleString('bn')}{' '}
                            টাকা
                        </span>
                    </div>
                </div>
            </div>

            {/* মন্তব্য বিভাগ */}
            {comments ||
                (data?.note && (
                    <div className="mt-6">
                        <h3 className="mb-2 font-medium">মন্তব্য</h3>
                        <p className="h-fit w-full rounded-[4px] border-[0.5px] border-[#131313] p-3 print:h-[50px]">{comments || data?.note} </p>
                    </div>
                ))}
            <div className="flex items-center justify-center gap-2">
                যোগ করেছেন :
                <img
                    src={
                        getAvatarImage(receiver?.img || data?.receiver?.img, 'staff_images', receiver?.name || data?.receiver?.name) ||
                        getAvatarImage(user?.img, 'staff_images', user?.name)
                    }
                    alt=""
                    className="h-[20px] w-[20px] rounded-sm print:h-[10px] print:w-[10px]"
                />
                {receiver?.name || data?.receiver?.name || user?.name} আইডি: {receiver?.unique_id || data?.receiver?.unique_id || user?.unique_id}
            </div>
        </div>
    );
});

export default AdmissionFeePrintReceiptComponent;
