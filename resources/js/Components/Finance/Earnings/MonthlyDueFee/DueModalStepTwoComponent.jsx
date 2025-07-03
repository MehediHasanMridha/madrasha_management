import StaticBtn from '@/Components/UI/StaticBtn';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

const DueModalStepTwoComponent = ({ data, setMonthlyDueFeeStep, selectedDueData, loading, comments }) => {
    const { user } = usePage().props.auth;
    return (
        <div>
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
                <div className="h-fit overflow-x-auto print:h-fit print:overflow-y-auto">
                    <table className="w-full min-w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="border-[0.5px] border-black px-4 py-2 text-left">ক্রমিক</th>
                                <th className="border-[0.5px] border-black px-4 py-2 text-left">মাস</th>
                                <th className="border-[0.5px] border-black px-4 py-2 text-right">বকেয়া ফি</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="w-[50px] border-[0.5px] border-black px-4 py-2">{Number(1).toLocaleString('bn')}</td>
                                {/* how to convert month name to bangla */}
                                <td className="border-[0.5px] border-black px-4 py-2">{selectedDueData?.month}</td>
                                <td className="border-[0.5px] border-black px-4 py-2 text-right">
                                    {Number(selectedDueData?.due).toLocaleString('bn')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* পেমেন্ট সারাংশ */}
                <div className="mt-6 flex justify-between rounded-[4px] border-[0.5px] border-[#131313] p-4">
                    <div className="w-full space-y-2">
                        <div className="flex justify-between">
                            <span>মোট:</span>
                            <span>{Number(selectedDueData?.due).toLocaleString('bn')} টাকা</span>
                        </div>
                        <div className="flex justify-between border-t border-dashed pt-2">
                            <span>পরিশোধিত:</span>
                            <span>{Number(selectedDueData?.due).toLocaleString('bn')} টাকা</span>
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
            <div className="mt-5 flex w-full gap-[18px]">
                <StaticBtn
                    onClick={() => setMonthlyDueFeeStep((prev) => prev - 1)}
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#0267FF] hover:text-white"
                    disabled={loading}
                >
                    Back
                </StaticBtn>
                <StaticBtn
                    onClick={() => {}}
                    className={cn('flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#0267FF] text-white')}
                >
                    {loading ? 'Processing...' : 'Next'}
                </StaticBtn>
            </div>
        </div>
    );
};

export default DueModalStepTwoComponent;
