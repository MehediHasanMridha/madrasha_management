import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { usePage } from '@inertiajs/react';
import { forwardRef } from 'react';
import { FaPhone } from 'react-icons/fa6';
import ApplicationLogo from '../ApplicationLogo';
const MonthlyFeePrintReceiptComponent = forwardRef((props, ref) => {
    const { data, month = '' } = props;
    const monthDetails = JSON.parse(month && month?.details);
    const totalFee = monthDetails?.reduce((acc, month) => {
        return acc + (Number(month?.boarding_fee) || 0) + (Number(month?.academic_fee) || 0);
    }, 0);
    const discount = (monthDetails && monthDetails[0]?.discount) || 0;
    const totalDue = monthDetails?.reduce((acc, month) => {
        return acc + (Number(month?.due_academic_fee) || 0) + (Number(month?.due_boarding_fee) || 0);
    }, 0);
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
    return (
        <div className="space-y-2" ref={ref}>
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
                        <span>০১৭৫৩-৮৩৮৩৯০</span>
                    </div>
                    <div className="prtint:w-[100px] flex w-fit items-center justify-between gap-2">
                        <FaPhone className="h-[8px] w-[8px]" />
                        <span>০১৭৮৫-৬৬০০৫৭</span>
                    </div>
                </div>
            </div>
            <hr className="print:border-[0.5px] print:border-black" />
            {/* শিক্ষার্থী তথ্য */}
            {data && (
                <div className="flex items-center justify-between rounded-[8px]">
                    <div className="flex items-center space-x-4">
                        <img
                            src={getAvatarImage(data?.image, 'student_images', data?.name)}
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
                        <div className="text-lg font-semibold print:text-[12px]">মাসিক রসিদ</div>
                        <div className="text-sm text-black print:text-[10px]">তারিখ: {formattedDate}</div>
                    </div>
                </div>
            )}
            {/* মাসিক ফি টেবিল */}
            <div className="h-fit overflow-x-auto print:h-fit print:overflow-y-auto">
                <table className="w-full min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border-[0.5px] border-black px-4 py-2 text-left">ক্রমিক</th>
                            <th className="border-[0.5px] border-black px-4 py-2 text-left">
                                মাস ({(monthDetails?.length > 0 && monthDetails[0]?.year) || new Date().getFullYear()})
                            </th>
                            <th className="border-[0.5px] border-black px-4 py-2 text-right">বোর্ডিং ফি</th>
                            <th className="border-[0.5px] border-black px-4 py-2 text-right">একাডেমিক ফি</th>
                            <th className="border-[0.5px] border-black px-4 py-2 text-right">মোট</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthDetails?.map((item, index) => (
                            <tr>
                                <td className="border-[0.5px] border-black px-4 py-2">{Number(1).toLocaleString('bn')}</td>
                                {/* how to convert month name to bangla */}
                                <td className="border-[0.5px] border-black px-4 py-2">{item?.month}</td>
                                <td className="border-[0.5px] border-black px-4 py-2">{Number(item?.boarding_fee || 0).toLocaleString('bn')}</td>
                                <td className="border-[0.5px] border-black px-4 py-2">{Number(item?.academic_fee || 0).toLocaleString('bn')}</td>
                                <td className="border-[0.5px] border-black px-4 py-2 text-right">
                                    {(Number(item?.boarding_fee) + Number(item?.academic_fee) || 0).toLocaleString('bn')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            পেমেন্ট সারাংশ
            <div className="mt-2 flex justify-between rounded-[4px] border-[0.5px] border-[#131313] p-4">
                <div className="w-full space-y-2">
                    <div className="flex justify-between">
                        <span>মোট:</span>
                        <span>{(totalFee || 0).toLocaleString('bn')} টাকা</span>
                    </div>
                    <div className="flex justify-between">
                        <span>ছাড়:</span>
                        <span>{(discount || 0).toLocaleString('bn')} টাকা</span>
                    </div>
                    <div className="flex justify-between">
                        <span>বাকি:</span>
                        <span>{(totalDue || 0).toLocaleString('bn')} টাকা</span>
                    </div>
                    <div className="flex justify-between border-t border-dashed pt-2">
                        <span>পরিশোধিত:</span>
                        <span>{(totalFee - discount || 0).toLocaleString('bn')} টাকা</span>
                    </div>
                </div>
            </div>
            {/* মন্তব্য বিভাগ */}
            {month?.note && (
                <div className="mt-2">
                    <h3 className="mb-2 font-medium">মন্তব্য</h3>
                    <p className="h-fit w-full rounded-[4px] border-[0.5px] border-[#131313] p-3 print:h-[50px]">{month?.note} </p>
                </div>
            )}
            <div className="flex items-center justify-center gap-2">
                যোগ করেছেন :
                <img
                    src={getAvatarImage(month?.receiver?.img, 'staff_images', month?.receiver?.name)}
                    alt=""
                    className="h-[20px] w-[20px] rounded-sm print:h-[10px] print:w-[10px]"
                />
                {month?.receiver?.name} আইডি: {month?.receiver?.unique_id || 'N/A'}
            </div>
        </div>
    );
});

export default MonthlyFeePrintReceiptComponent;
