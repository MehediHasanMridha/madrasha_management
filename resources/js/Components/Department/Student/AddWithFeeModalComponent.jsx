import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const AddWithFeeModalComponent = ({
    fees,
    academicFee,
    boardingFee,
    register,
    setWithFee,
    withFee,
    errors,
    step,
    setCollectedMonthlyFeeForPrint,
}) => {
    const [admissionFee, setAdmissionFee] = useState(fees?.find((item) => item.name === 'Admission Fee')?.amount || '');

    useEffect(() => {
        if (withFee) {
            const monthlyFee =
                (Number(academicFee) || Number(fees?.find((item) => item.name === 'Academic Fee')?.amount)) +
                (Number(boardingFee) || Number(fees?.find((item) => item.name === 'Boarding Fee')?.amount));
            setCollectedMonthlyFeeForPrint(monthlyFee);
        } else {
            setCollectedMonthlyFeeForPrint(null);
        }
    }, [withFee, fees, setCollectedMonthlyFeeForPrint, academicFee, boardingFee]);

    return (
        <FieldSet>
            <div>
                <Field label={'Admission Fee'} error={errors?.admission_fee}>
                    <input
                        {...register('admission_fee', {
                            required: step === 2 ? 'Admission fee is required' : false,
                            valueAsNumber: true,
                            validate: (value) => {
                                if (value < 0) {
                                    return 'Admission fee cannot be negative';
                                }
                                return true;
                            },
                        })}
                        type="number"
                        value={admissionFee}
                        onChange={(e) => {
                            setAdmissionFee(e.target.value);
                            register('admission_fee').onChange(e);
                        }}
                        min={0}
                        className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                    />
                </Field>
            </div>
            <div className="relative">
                <div className="absolute top-0 right-0 flex items-center gap-2 rounded-[8px] bg-[#FDEDED] px-[16px] py-[12px]">
                    <span className="text-[12px] text-[#AFAFAF]">With Monthly Fee</span>
                    <input
                        type="checkbox"
                        checked={withFee}
                        onChange={(e) => setWithFee(e.target.checked)}
                        className="right-0 h-5 w-5 rounded-[8px] border-[1px] border-[#AFAFAF] bg-red-500 px-[16px] py-[12px] focus:outline-0"
                    />
                </div>
                <Field label={'Monthly Fee'} error={errors?.month}>
                    <select
                        {...register('month', { required: withFee ? 'Month is required' : false })}
                        disabled={!withFee}
                        className={cn(
                            'rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0',
                            !withFee && 'cursor-not-allowed bg-gray-200',
                        )}
                    >
                        <option value="">Select Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </Field>
                <FieldSet>
                    <Field label={'Academic Fee'}>
                        <input
                            type="text"
                            readOnly
                            disabled={!withFee}
                            value={academicFee || fees?.find((item) => item.name === 'Academic Fee')?.amount}
                            className={cn(
                                'rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0',
                                !withFee && 'cursor-not-allowed bg-gray-200',
                            )}
                        />
                    </Field>
                    <Field label={'Boarding Fee'}>
                        <input
                            type="text"
                            readOnly
                            value={boardingFee || fees?.find((item) => item.name === 'Boarding Fee')?.amount || ''}
                            disabled={!withFee}
                            className={cn(
                                'rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0',
                                !withFee && 'cursor-not-allowed bg-gray-200',
                            )}
                        />
                    </Field>
                </FieldSet>
            </div>
        </FieldSet>
    );
};

export default AddWithFeeModalComponent;
