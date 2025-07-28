import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import StaticBtn from '@/Components/UI/StaticBtn';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

const AdmissionFeeModalStepOneComponent = ({
    data,
    setStep,
    allDepartments,
    setClasses,
    classes,
    setSelectedClassAdmissionFee,
    selectedClassAdmissionFee,
    register,
    errors,
    handleSubmit,
    setValue,
    comments,
    submit,
    isSubmitting,
    setSelectedClassName,
}) => {
    const ref = useRef(null);

    return (
        <>
            {/* Main Content */}
            <div className="w-full">
                {/* Student Info Section */}
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
                </div>
                {/* Promote To Section */}
                <FieldSet label={'Promote To'} labelClassName="text-lg font-semibold text-gray-500">
                    <Field error={errors?.department}>
                        <select
                            {...register('department', { required: 'Department is required' })}
                            className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-black focus:outline-0"
                            onChange={(e) => {
                                setClasses(() => allDepartments?.find((dept) => dept.id == e.target.value)?.classes || []);
                                if (ref.current) {
                                    ref.current.value = '';
                                }
                                register('department').onChange(e);
                            }}
                        >
                            <option value="" disabled selected>
                                Select Department
                            </option>
                            {allDepartments?.map((item, index) => {
                                if (item?.id === data?.department_id) {
                                    return (
                                        <option key={index} value={item?.id} selected>
                                            {item.name}
                                        </option>
                                    );
                                }
                                return (
                                    <option key={index} value={item?.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </Field>
                    <Field error={errors?.class}>
                        <select
                            {...register('class', { required: 'Class is required' })}
                            className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-black focus:outline-0"
                            onChange={(e) => {
                                register('class').onChange(e);
                                const selectedClass = classes?.find((cls) => cls.id == e.target.value);
                                const admissionFee = selectedClass?.fee_types?.find((fee) => fee.name === 'Admission Fee')?.amount || 0;
                                setValue('admissionFee', admissionFee);
                                setSelectedClassAdmissionFee(admissionFee);
                                setSelectedClassName(selectedClass?.name || '');
                            }}
                            ref={(el) => {
                                ref.current = el;
                                register('class').ref(el);
                            }}
                            // value={data?.class_id || ''}
                        >
                            <option value="">Select Class</option>
                            {classes?.map((item, index) => (
                                <option key={index} disabled={item?.id === data?.class_id} value={item?.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </Field>
                </FieldSet>
                {/* Admission Fee */}
                <div className="flex w-full items-center gap-1.5">
                    <label className="w-40 flex-shrink-0 text-lg leading-6 text-gray-500">Admission fee</label>
                    <Field className="w-full" error={errors?.admissionFee}>
                        <input
                            {...register('admissionFee', {
                                required: 'Admission fee is required',
                                valueAsNumber: true,
                                validate: (value) => {
                                    if (value < 0) {
                                        return 'Admission fee cannot be negative';
                                    }
                                    return true;
                                },
                            })}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || !isNaN(value)) {
                                    register('admissionFee').onChange(e);
                                    setSelectedClassAdmissionFee(value ? parseFloat(value) : 0);
                                }
                            }}
                            type="text"
                            className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-right text-black focus:outline-0"
                        />
                    </Field>
                </div>
                {/* Comments */}
                <div className="flex w-full items-center gap-1.5 bg-white">
                    <label className="w-40 flex-shrink-0 text-lg leading-6 text-gray-500">Comments</label>
                    <Field className="w-full" error={errors?.comments}>
                        <>
                            <textarea
                                {...register('comments', {
                                    maxLength: 100,
                                    validate: (value) => {
                                        if (value.length > 100) {
                                            return 'Comments cannot exceed 100 characters';
                                        }
                                        return true;
                                    },
                                })}
                                placeholder="Add text"
                                className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-right text-black focus:outline-0"
                                maxLength={100}
                            />
                            <div className="mt-1 text-right text-base text-gray-400">{comments?.length}/100</div>
                        </>
                    </Field>
                </div>
                {/* Summary Section */}
                <div className="flex w-full flex-col justify-center gap-2 rounded-lg bg-gray-100 p-3">
                    {/* Total */}
                    <div className="flex w-full flex-row items-center justify-between gap-1">
                        <span className="flex-1 text-base text-gray-500">Total :</span>
                        <div className="flex flex-1 flex-row items-center justify-end gap-2.5 rounded px-3">
                            <span className="text-base text-gray-500">{selectedClassAdmissionFee} BDT</span>
                        </div>
                    </div>

                    {/* Divider Line */}
                    {/* <hr className="w-full border-gray-400" /> */}

                    {/* Paid */}
                    {/* <div className="flex w-full flex-row items-center justify-between gap-1">
                            <span className="flex-1 text-base text-gray-500">Paid :</span>
                            <div className="flex flex-1 flex-row items-center justify-end gap-2.5 rounded px-3">
                                <span className="text-base text-gray-500">{paidAmount.toLocaleString()} BDT</span>
                            </div>
                        </div> */}
                </div>
            </div>
            {/* Navigation Buttons */}
            <div className="mt-5 flex w-full gap-[18px]">
                <StaticBtn
                    onClick={() => setStep((prev) => prev - 1)}
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#0267FF] hover:text-white"
                    disabled={isSubmitting}
                >
                    Back
                </StaticBtn>
                <StaticBtn
                    onClick={handleSubmit(submit)}
                    className={cn('flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#0267FF] text-white')}
                >
                    {isSubmitting ? 'Processing...' : 'Submit'}
                </StaticBtn>
            </div>
        </>
    );
};

export default AdmissionFeeModalStepOneComponent;
