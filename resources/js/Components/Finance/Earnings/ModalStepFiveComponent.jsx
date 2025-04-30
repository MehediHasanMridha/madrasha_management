import StaticBtn from '@/Components/UI/StaticBtn';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

const ModalStepFiveComponent = ({ data, loading, setStep, fee, setFee, submitData, setSelectedRows, selectedRows, setLoading, comments }) => {
    const academic_divider = (fee?.academic_fee / data?.academic_fee) | 0;
    const academic_division = fee?.academic_fee % data?.academic_fee | 0;
    const boarding_divider = (fee?.boarding_fee / data?.boarding_fee) | 0;
    const boarding_division = fee?.boarding_fee % data?.boarding_fee | 0;
    const { user } = usePage().props.auth;

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between rounded-[8px] bg-[#F2F2F2] p-[12px]">
                    <div className="flex items-center space-x-4">
                        <img
                            src={getAvatarImage(data.image, 'student_images', data.name)}
                            alt="Student"
                            className="h-[50px] w-[50px] rounded-full border"
                        />
                        <div>
                            <p className="text-lg font-medium text-[#131313]">{data.name || 'Abdullah Al Mahmud'}</p>
                            <p className="text-sm text-[#4A4A4A]">{data.unique_id || '345787'}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-[#4A4A4A]">Payment date:</span>
                        <span className="text-sm font-medium text-[#131313]">
                            {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                </div>
                <div className="rounded-lg border border-[#AFAFAF]">
                    <table className="w-full border-collapse overflow-hidden rounded-lg">
                        <thead>
                            <tr className="bg-[#F2F2F2]">
                                <th className="w-[56px] border-r border-[#AFAFAF] p-3 text-left text-sm font-normal text-[#131313]">S/N</th>
                                <th className="border-r border-[#AFAFAF] p-3 text-left text-sm font-normal text-[#131313]">Month</th>
                                <th className="border-r border-[#AFAFAF] p-3 text-left text-sm font-normal text-[#131313]">Boarding fee</th>
                                <th className="border-r border-[#AFAFAF] p-3 text-left text-sm font-normal text-[#131313]">Academic fee</th>
                                <th className="p-3 text-left text-sm font-normal text-[#131313]">Due</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedRows.map((row, index) => {
                                const boarding_fee =
                                    index < boarding_divider ? row?.boarding_fee : index === boarding_divider ? boarding_division : 0;
                                const academic_fee =
                                    index < academic_divider ? row?.academic_fee : index === academic_divider ? academic_division : 0;
                                return (
                                    <tr key={index} className="border-b border-[#AFAFAF]">
                                        <td className="border-r border-[#AFAFAF] p-3 text-sm text-[#4A4A4A]">{index + 1}</td>
                                        <td className="border-r border-[#AFAFAF] p-3 text-sm text-[#4A4A4A]">{row?.month}</td>
                                        <td className="border-r border-[#AFAFAF] p-3 text-right text-sm text-[#4A4A4A]">
                                            {boarding_fee.toLocaleString('en-US', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 })}
                                        </td>
                                        <td className="border-r border-[#AFAFAF] p-3 text-right text-sm text-[#4A4A4A]">
                                            {academic_fee.toLocaleString('en-US', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 })}
                                        </td>
                                        <td className="p-3 text-right text-sm text-[#4A4A4A]">
                                            {Number(data?.academic_fee - academic_fee + data?.boarding_fee - boarding_fee).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'BDT',
                                                minimumFractionDigits: 0,
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Payment Summary Section */}
                <div className="space-y-2 rounded-lg bg-[#F2F2F2] p-3">
                    <div className="flex items-center justify-between">
                        <span className="text-base text-[#4A4A4A]">Total :</span>
                        <div className="flex justify-end">
                            <span className="text-base text-[#4A4A4A]">
                                {Number(fee?.total).toLocaleString('en-US', { style: 'currency', currency: 'BDT' })}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-base text-[#4A4A4A]">Discount :</span>
                        <div className="flex justify-end">
                            <span className="text-base text-[#4A4A4A]">
                                {Number(fee?.discount).toLocaleString('en-US', { style: 'currency', currency: 'BDT' })}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-base text-[#4A4A4A]">Grand total :</span>
                        <div className="flex justify-end">
                            <span className="text-base text-[#4A4A4A]">
                                {Number(fee?.total - fee?.discount).toLocaleString('en-US', { style: 'currency', currency: 'BDT' })}
                            </span>
                        </div>
                    </div>

                    <hr className="my-2 border-t border-[#AFAFAF]" />

                    <div className="flex items-center justify-between">
                        <span className="text-base text-[#4A4A4A]">Paid :</span>
                        <div className="flex justify-end">
                            <span className="text-base text-[#4A4A4A]">
                                {Number(fee?.boarding_fee + fee?.academic_fee - fee.discount).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'BDT',
                                })}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-base text-[#4A4A4A]">Due :</span>
                        <div className="flex w-[120px] justify-end">
                            <span className="text-base text-[#4A4A4A]">
                                {Number(fee.academic_due + fee?.boarding_due).toLocaleString('en-US', { style: 'currency', currency: 'BDT' })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="space-y-2 rounded-lg bg-[#F2F2F2] p-3">
                    <p className="text-sm text-[#AFAFAF]">Comment</p>
                    <p className="text-base text-[#4A4A4A]">{comments || 'N/A'}</p>
                </div>

                {/* Receipt Attribution Section */}
                <div className="flex w-full items-center justify-center gap-2.5">
                    <span className="text-sm text-[#4A4A4A]">This receipt is added by :</span>
                    <div className="h-8 w-8 overflow-hidden rounded-full">
                        <img src={getAvatarImage(user?.image, 'staff_images', user?.name)} alt="Admin" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-sm font-medium text-[#131313]">{user?.name}</span>
                    <span className="text-sm text-[#AFAFAF]">(ID : {user?.unique_id || 'N/A'})</span>
                </div>

                {/* Action Buttons Section */}
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
                    onClick={submitData}
                    className={cn(
                        'flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#0267FF] text-white',
                        selectedRows.length === 0 && 'cursor-not-allowed opacity-50',
                    )}
                >
                    {loading ? 'Processing...' : 'Submit'}
                </StaticBtn>
            </div>
        </>
    );
};

export default ModalStepFiveComponent;
