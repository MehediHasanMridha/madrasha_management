import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import StaticBtn from '@/Components/UI/StaticBtn';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useState } from 'react';

const ModalStepFourComponent = ({ data, loading, setStep, year, setYear, fee, setFee, submitData, setSelectedRows, selectedRows }) => {
    const [comments, setComments] = useState('');

    const monthColor = ['bg-red-500', 'bg-green-500', 'bg-blue-500', ' bg-yellow-500', ' bg-purple-500', ' bg-pink-500'];

    // Calculate totals when fees change

    const deleteMonth = (month) => {
        setSelectedRows((prev) => {
            const updatedRows = prev.filter((item) => item.month !== month);
            setFee({
                ...fee,
                boarding_fee: updatedRows.reduce((acc, curr) => acc + curr?.boarding_fee, 0),
                academic_fee: updatedRows.reduce((acc, curr) => acc + curr?.academic_fee, 0),
                total: updatedRows.reduce((acc, curr) => acc + curr?.boarding_fee + curr?.academic_fee, 0),
            });
            return updatedRows;
        });
    };

    const formatCurrency = (value) => {
        return `${value} BDT`;
    };

    return (
        <div className="space-y-4">
            {/* Student Info Section */}
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
                <div className="">
                    <span className="text-sm text-[#4A4A4A]">
                        Total Boarding fee:{' '}
                        <span className="font-semibold text-[#131313]">
                            {formatCurrency(selectedRows?.reduce((acc, curr) => acc + curr?.boarding_fee, 0))}
                        </span>
                    </span>
                    <br />
                    <span className="text-sm text-[#4A4A4A]">
                        Total Academic fee:{' '}
                        <span className="font-semibold text-[#131313]">
                            {formatCurrency(selectedRows?.reduce((acc, curr) => acc + curr?.academic_fee, 0))}
                        </span>
                    </span>
                </div>
            </div>
            {/* Fee Details Section */}
            <FieldSet className="grid gap-0 md:grid-cols-1">
                {/* Month Selection */}
                <div className="flex items-center">
                    <div className="w-40 text-lg text-[#4A4A4A]">Month</div>
                    <div className="flex flex-1 flex-wrap gap-2.5 rounded-lg border border-[#AFAFAF] p-3">
                        {selectedRows.map((item, index) => (
                            <div
                                key={index}
                                className={cn(
                                    'flex h-7 cursor-pointer items-center rounded-full border border-[#AFAFAF] px-2',
                                    // monthColor[Math.floor(Math.random() * monthColor.length)],
                                )}
                                onClick={() => deleteMonth(item.month)}
                            >
                                <span className="text-xs text-[#4A4A4A]">{item.month.slice(0, 3)}</span>
                                <X className="ml-1 h-4 w-4 cursor-pointer text-[#4A4A4A]" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Boarding Fee */}
                <div className="flex items-center">
                    <div className="w-40 text-lg text-[#4A4A4A]">Boarding fee</div>
                    <Field className="h-12 flex-1 rounded-lg border border-[#AFAFAF] p-3">
                        <input
                            type="text"
                            className="w-full text-right text-[#131313] focus:outline-none"
                            value={fee.boarding_fee}
                            onChange={(e) => setFee({ ...fee, boarding_fee: Number(e.target.value) })}
                        />
                    </Field>
                </div>

                {/* Academic Fee */}
                <div className="flex items-center">
                    <div className="w-40 text-lg text-[#4A4A4A]">Academic fee</div>
                    <Field className="h-12 flex-1 rounded-lg border border-[#AFAFAF] p-3">
                        <input
                            type="text"
                            className="w-full text-right text-[#131313] focus:outline-none"
                            value={Number(fee?.academic_fee)}
                            onChange={(e) => setFee({ ...fee, academic_fee: Number(e.target.value) })}
                        />
                    </Field>
                </div>

                {/* Discount */}
                <div className="flex items-center">
                    <div className="w-40 text-lg text-[#4A4A4A]">Discount</div>
                    <Field className="h-12 flex-1 rounded-lg border border-[#AFAFAF] p-3">
                        <input
                            type="text"
                            className="w-full text-right text-[#131313] focus:outline-none"
                            value={fee.discount}
                            onChange={(e) => setFee({ ...fee, discount: Number(e.target.value) })}
                        />
                    </Field>
                </div>

                {/* Comments */}
                <div className="flex items-center">
                    <div className="w-40 text-lg text-[#4A4A4A]">Comments</div>
                    <div className="relative h-[78px] flex-1 rounded-lg border border-[#AFAFAF] p-3">
                        <textarea
                            className="w-full resize-none text-right text-[#131313] focus:outline-none"
                            placeholder="Add text"
                            value={comments}
                            onChange={(e) => setComments(e.target.value.slice(0, 200))}
                        />
                        <div className="absolute right-3 bottom-2 text-sm text-[#AFAFAF]">{comments.length}/200</div>
                    </div>
                </div>

                {/* Calculation Summary */}
            </FieldSet>
            <div className="space-y-2 rounded-lg bg-[#F2F2F2] p-3">
                <div className="flex items-center justify-between">
                    <span className="text-base text-[#4A4A4A]">Total :</span>
                    <div className="px-3">
                        <span className="text-base text-[#4A4A4A]">{formatCurrency(fee?.total)}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-base text-[#4A4A4A]">Discount :</span>
                    <div className="px-3">
                        <span className="text-base text-[#4A4A4A]">{formatCurrency(fee?.discount)}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-base text-[#131313]">Grand total :</span>
                    <div className="px-3">
                        <span className="text-base text-[#131313]">{formatCurrency(fee?.total - fee?.discount)}</span>
                    </div>
                </div>
                <div className="my-2 border-t border-[#AFAFAF]"></div>
                <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-green-800">Paid :</span>
                    <div className="px-3">
                        <span className="text-base font-semibold text-green-800">
                            {formatCurrency(fee?.boarding_fee + fee?.academic_fee - fee.discount)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-base text-red-500">Due :</span>
                    <div className="px-3">
                        <span className="text-base text-red-500">{formatCurrency(fee.academic_due + fee?.boarding_due)}</span>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-5 flex w-full gap-[18px]">
                <StaticBtn
                    onClick={() => setStep((prev) => prev - 1)}
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

export default ModalStepFourComponent;
