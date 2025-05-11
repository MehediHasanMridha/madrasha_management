import DatePickerUI from '@/Components/UI/DatePickerUI';
import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import StaticBtn from '@/Components/UI/StaticBtn';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { CirclePlus, Trash2 } from 'lucide-react';
import { Controller } from 'react-hook-form';

const OtherModelStepTwoComponent = ({
    submitData,
    control,
    register,
    errors,
    date,
    setDate,
    voucherTypes,
    fields,
    append,
    remove,
    itemsData,
    setItemsData,
    loading,
    setStep,
}) => {
    return (
        <>
            <FieldSet>
                <Field label="Voucher Holder" error={errors.voucherHolder}>
                    <input
                        type="text"
                        placeholder="Enter Voucher Holder"
                        className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-black focus:outline-0"
                        {...register('voucherHolder', { required: 'Voucher Holder is required' })}
                    />
                </Field>
                <Field label="Voucher Date">
                    <Controller
                        name="date"
                        control={control}
                        rules={{ required: 'Date is required' }}
                        defaultValue={date}
                        render={({ field }) => (
                            <DatePickerUI
                                {...field}
                                value={date}
                                onChange={(newDate) => {
                                    setDate(dayjs(newDate).format('YYYY-MM-DD'));
                                    field.onChange(dayjs(newDate).format('YYYY-MM-DD'));
                                }}
                            />
                        )}
                    />
                </Field>
            </FieldSet>
            <Field label="Voucher Type" error={errors.voucherType}>
                <select
                    className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-black focus:outline-0"
                    {...register('voucherType', { required: 'Voucher Type is required' })}
                >
                    <option value="">Select Option</option>
                    {voucherTypes?.map((type) => {
                        if (type?.slug === 'salary') return null;
                        return (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        );
                    })}
                </select>
            </Field>

            <p className="pb-[6px]">Add Product details</p>
            <div className="rounded-lg border border-solid border-[#AFAFAF] px-3 py-4">
                <div className="max-h-[200px] space-y-[4px] overflow-y-scroll">
                    {fields.map((field, index) => (
                        <div className="flex w-full items-center justify-between space-x-[4px]" key={field.id}>
                            <input
                                className="w-[45px] rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-black focus:outline-0"
                                defaultValue={index + 1}
                                readOnly
                            />
                            <input
                                className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-black focus:outline-0"
                                {...register(`items[${index}].name`, { required: 'Name is required' })}
                                placeholder="Item Name"
                            />
                            <input
                                {...register(`items[${index}].amount`, { required: 'Amount is required' })}
                                className="w-fit rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-center text-black focus:outline-0"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (isNaN(value)) {
                                        return;
                                    }
                                    setItemsData((prev) => {
                                        const newData = [...prev];
                                        newData[index].amount = value;
                                        return newData;
                                    });
                                }}
                            />
                            <Trash2 size={34} strokeWidth={1.5} className="mx-2 cursor-pointer text-red-500" onClick={() => remove(index)} />
                        </div>
                    ))}
                </div>
                <hr className="my-[12px] border-[1px] bg-black" />
                <button
                    className="flex items-center gap-x-2 rounded-lg p-1 text-blue-400"
                    type="button"
                    onClick={() => append({ name: '', amount: 0 })}
                >
                    <CirclePlus size={18} strokeWidth={1.5} />
                    Add Item
                </button>
            </div>

            <Field label="Comments">
                <textarea
                    cols="30"
                    rows="3"
                    className="w-full rounded-[8px] border border-solid border-[#AFAFAF] px-[16px] py-[12px] text-black focus:outline-0"
                    {...register('comments')}
                ></textarea>
            </Field>
            <hr className="my-[12px] border-[1px] bg-black" />
            <div className="flex w-full items-center justify-between font-semibold">
                <span>Total:</span>
                <span>{itemsData.reduce((total, item) => total + Number(item.amount), 0)} BDT</span>
            </div>
            <div className="mt-5 flex w-full gap-[18px]">
                <StaticBtn
                    onClick={() => setStep((prev) => prev - 1)}
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#0267FF] hover:text-white"
                >
                    Back
                </StaticBtn>
                <StaticBtn
                    onClick={() => {
                        if (loading) return;
                        // setStep((prev) => prev + 1);
                        // getData();
                        submitData();
                    }}
                    className={cn(
                        'flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#0267FF] text-white',
                        loading && 'cursor-not-allowed bg-[#AFAFAF] text-[#4A4A4A]',
                    )}
                >
                    {loading ? 'Loading...' : 'Submit'}
                </StaticBtn>
            </div>
        </>
    );
};

export default OtherModelStepTwoComponent;
