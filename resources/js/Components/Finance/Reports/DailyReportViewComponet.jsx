import ApplicationLogo from '@/Components/ApplicationLogo';
import Confirmpop from '@/Components/UI/Confirmpop';
import LoadingUI from '@/Components/UI/LoadingUI';
import ModalUI from '@/Components/UI/ModalUI';
import StaticBtn from '@/Components/UI/StaticBtn';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { forwardRef } from 'react';

const DailyReportViewComponent = forwardRef(
    ({
        reportViewModal,
        setReportViewModal,
        printViewDom,
        reportViewData,
        loading,
        user,
        printFn,
        day,
        is_approved,
        handleApprove,
        setConfirm,
        confirm,
    }) => {
        console.log('🚀 ~ reportViewData:', reportViewData);
        const { institute, auth } = usePage().props;
        return (
            <ModalUI
                isModalOpen={reportViewModal}
                handleCancel={() => setReportViewModal(false)}
                title="Daily Report"
                style={{ top: 0 }}
                handleOk={() => setReportViewModal(false)}
            >
                {loading ? (
                    <LoadingUI />
                ) : (
                    <>
                        <div className="h-[60vh] overflow-y-auto p-4 print:max-h-[100vh] print:overflow-y-visible print:p-0" ref={printViewDom}>
                            {/* Header */}
                            <div className="mb-4 flex items-center justify-between pb-4">
                                <div className="flex items-center gap-4">
                                    <ApplicationLogo alt="School Logo" className="h-12 print:h-[37px]" />
                                    <div>
                                        <h1 className="text-lg font-bold print:text-[20px]">{institute?.name_bangla || 'এখানে মাদরাসার নায়া'}</h1>
                                        <p className="text-sm text-black print:text-[12px]">{institute?.address || 'এখানে মাদরাসার ঠিকানা'}</p>
                                    </div>
                                </div>
                                <div className="text-right text-sm print:text-[15px]">
                                    <div className="prtint:w-[100px] flex w-fit items-center justify-between gap-2 font-bold">
                                        দৈনিক হিসাব রিপোর্ট
                                    </div>
                                    <div className="prtint:w-[100px] flex w-fit items-center justify-between gap-2">
                                        তারিখ: {new Date(day).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                </div>
                            </div>

                            <hr className="mb-4 border-1 border-black" />

                            {/* Income Section */}
                            <div className="mb-4">
                                <h2 className="mb-2 font-bold">আজকের আয়</h2>
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border">
                                            <th className="w-[20px] border p-2">ক্রমিক</th>
                                            <th className="border p-2 text-left">আয়ের উৎস</th>
                                            <th className="w-[100px] border p-2 text-left">টাকা</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportViewData?.incomings?.map((item, index) => {
                                            let feeName;
                                            switch (item?.type) {
                                                case 'Academic Fee':
                                                    feeName = 'একাডেমিক ফি';
                                                    break;
                                                case 'Exam Fee':
                                                    feeName = 'পরীক্ষা ফি';
                                                    break;
                                                case 'Admission Fee':
                                                    feeName = 'ভর্তি ফি';
                                                    break;
                                                case 'Other Fee':
                                                    feeName = 'অন্যান্য ফি';
                                                    break;
                                                case 'Donation':
                                                    feeName = 'দান';
                                                    break;
                                                case 'Boarding Fee':
                                                    feeName = 'বোর্ডিং ফি';
                                                    break;
                                                default:
                                                    break;
                                            }
                                            return (
                                                <tr key={index} className="border">
                                                    <td className="border p-2">{Number(index + 1).toLocaleString('bn')}</td>
                                                    <td className="border p-2">{feeName}</td>
                                                    <td className="border p-2 text-right">
                                                        {Number(item.amount).toLocaleString('bn', {
                                                            minimumFractionDigits: 0,
                                                        })}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {/* ব্যয়ের অংশ */}
                            <div className="mb-4">
                                <h2 className="mb-2 font-bold">আজকের ব্যয়</h2>
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border">
                                            <td className="w-[20px] border p-2 font-bold">ক্রমিক</td>
                                            <td className="border p-2 font-bold">ভাউচারের নাম</td>
                                            <td className="border p-2 font-bold">ভাউচার নং</td>
                                            <td className="w-[100px] border p-2 font-bold">টাকা</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportViewData?.outgoings?.map((item, index) => (
                                            <tr key={index} className="border">
                                                <td className="border p-2">{(index + 1).toLocaleString('bn')}</td>
                                                <td className="border p-2">{item.name || 'স্টাফ বেতন'}</td>
                                                <td className="border p-2">{item.voucher_no ? item.voucher_no.toLocaleString('bn') : ''}</td>
                                                <td className="border p-2 text-right">
                                                    {Number(item.amount).toLocaleString('bn', {
                                                        minimumFractionDigits: 0,
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* সারসংক্ষেপ অংশ */}
                            <div className="mb-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>আজকের মোট আয়:</span>
                                    <span>
                                        {reportViewData?.incomings?.reduce((total, item) => total + Number(item.amount), 0).toLocaleString('bn')} টাকা
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>আজকের মোট ব্যয়:</span>
                                    <span>
                                        {reportViewData?.outgoings?.reduce((total, item) => total + item.amount, 0).toLocaleString('bn')} টাকা
                                    </span>
                                </div>
                                {reportViewData?.discounts > 0 && (
                                    <div className="flex justify-between">
                                        <span>আজকের মোট ছাড়:</span>
                                        <span>{Number(reportViewData?.discounts).toLocaleString('bn') || 0} টাকা</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold">
                                    <span>আজকের বর্তমান ব্যালেন্স:</span>
                                    <span>
                                        {(
                                            reportViewData?.incomings?.reduce((total, item) => total + Number(item.amount), 0) -
                                            reportViewData?.outgoings?.reduce((total, item) => total + item.amount, 0) -
                                            Number(reportViewData?.discounts)
                                        ).toLocaleString('bn')}{' '}
                                        টাকা
                                    </span>
                                </div>
                            </div>
                            {/* মন্তব্য অংশ*/}
                            <div className="mb-4">
                                <h2 className="mb-2 font-bold">মন্তব্য</h2>
                                <textarea className="min-h-[100px] w-full border border-black p-2" placeholder="এখানে মন্তব্য লিখুন" />
                            </div>
                            {/* স্বাক্ষর */}
                            <div className="absolute bottom-5 hidden w-full justify-between print:flex">
                                <div className="text-center">
                                    <div className="w-32 border-t border-black">বিভাগীয় প্রধান</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-32 border-t border-black">প্রধান শিক্ষক</div>
                                </div>
                            </div>
                            {/* ফুটার */}
                            <div className="absolute bottom-0 hidden w-full items-center justify-between text-[10px] print:flex">
                                <div>
                                    প্রিন্টের তারিখ: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                                <div className="text-center">
                                    এই রিপোর্টটি প্রিন্ট করেছেন © {user?.name} আইডি:{user?.unique_id}{' '}
                                </div>
                                <div>
                                    প্রিন্টের সময়: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                            {auth.permissions.viewAny && (
                                <Confirmpop
                                    title="Approve"
                                    description="Are you sure you want to approve this daily report?"
                                    open={confirm}
                                    handleOk={() => {
                                        handleApprove(day);
                                        setConfirm(false);
                                    }}
                                    handleCancel={() => setConfirm(false)}
                                >
                                    <StaticBtn
                                        className={cn(
                                            'mr-2 rounded bg-green-500 text-white hover:bg-green-600',
                                            is_approved ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                                        )}
                                        onClick={() => {
                                            if (is_approved) {
                                                return;
                                            }
                                            setConfirm(true);
                                        }}
                                        disabled={is_approved}
                                    >
                                        Approve
                                    </StaticBtn>
                                </Confirmpop>
                            )}
                            <div className="ml-auto flex gap-2">
                                <StaticBtn
                                    className="rounded bg-blue-500 text-white hover:bg-blue-600"
                                    onClick={() => {
                                        printFn();
                                    }}
                                >
                                    Print
                                </StaticBtn>
                                <StaticBtn className="rounded bg-red-500 text-white hover:bg-red-600" onClick={() => setReportViewModal(false)}>
                                    Close
                                </StaticBtn>
                            </div>
                        </div>
                    </>
                )}
            </ModalUI>
        );
    },
);

export default DailyReportViewComponent;
