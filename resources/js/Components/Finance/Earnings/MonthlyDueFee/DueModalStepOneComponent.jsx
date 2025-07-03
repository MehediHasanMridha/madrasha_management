import Field from '@/Components/UI/Field';
import StaticBtn from '@/Components/UI/StaticBtn';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { cn } from '@/lib/utils';

const DueModalStepOneComponent = ({ setMonthlyFeeStep, loading, data, selectedDueData, comments, setComments, submitData }) => {
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
                <div className="flex items-center">
                    <div className="w-40 text-lg text-[#4A4A4A]">Due amount</div>
                    <Field className="h-12 flex-1 rounded-lg border border-[#AFAFAF] p-3">
                        <input type="text" className="w-full text-right text-[#131313] focus:outline-none" value={selectedDueData?.due} readOnly />
                    </Field>
                </div>
                {/* Comments */}
                <div className="flex items-center">
                    <div className="w-40 text-lg text-[#4A4A4A]">Comments</div>
                    <div className="relative h-[78px] flex-1 rounded-lg border border-[#AFAFAF] p-3">
                        <textarea
                            className="w-full resize-none text-[#131313] focus:outline-none"
                            placeholder="Add text"
                            value={comments}
                            onChange={(e) => setComments(e.target.value.slice(0, 200))}
                        />
                        <div className="absolute right-3 bottom-2 text-sm text-[#AFAFAF]">{comments?.length}/200</div>
                    </div>
                </div>

                {/* Calculation Summary */}
                <div className="space-y-2 rounded-lg bg-[#F2F2F2] p-3">
                    <div className="flex items-center justify-between">
                        <span className="text-base text-[#4A4A4A]">Total :</span>
                        <div className="px-3">
                            <span className="text-base text-[#4A4A4A]">{selectedDueData?.due}</span>
                        </div>
                    </div>
                    <div className="my-2 border-t border-[#AFAFAF]"></div>
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold">Paid :</span>
                        <div className="px-3">
                            <span className="text-base font-semibold">{selectedDueData?.due}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex w-full gap-[18px]">
                <StaticBtn
                    onClick={() => setMonthlyFeeStep(1)}
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#0267FF] hover:text-white"
                    disabled={loading}
                >
                    Back
                </StaticBtn>
                <StaticBtn
                    onClick={submitData}
                    className={cn('flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#0267FF] text-white')}
                >
                    {loading ? 'Processing...' : 'Submit'}
                </StaticBtn>
            </div>
        </div>
    );
};

export default DueModalStepOneComponent;
