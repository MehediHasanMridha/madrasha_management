import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ExamClassSelectFieldContainer from '@/Container/Department/Exams/ExamClassSelectFieldContainer';
import { Calendar, Check } from 'lucide-react';

const ExamModalStepComponent = ({ onCancel, loading = false, isFeeEnabled, setIsFeeEnabled, handleSubmit, data, setData }) => {
    return (
        <div className="flex flex-col gap-8 px-6 py-4">
            {/* Exam Name Input */}
            <Field className="rounded-sm border border-[#AFAFAF] bg-[#F2F2F2] px-3 py-3">
                <input
                    type="text"
                    placeholder="Set a exam name"
                    value={data?.examName || ''}
                    onChange={(e) => setData({ examName: e.target.value })}
                    className={`w-full bg-transparent text-base font-normal outline-none placeholder:text-[#AFAFAF] ${
                        data?.examName ? 'text-[#131313]' : 'text-[#AFAFAF]'
                    }`}
                />
            </Field>

            {/* Date Section */}
            <FieldSet label={'Date'} labelClassName="font-normal text-lg">
                <Field label={'Start on'}>
                    <div className="flex items-center gap-2 rounded-sm border border-[#AFAFAF] px-3 py-3">
                        {' '}
                        <input
                            type="date"
                            value={data?.startDate || ''}
                            onChange={(e) => setData({ startDate: e.target.value })}
                            className={`flex-1 bg-transparent text-base font-normal outline-none ${data?.startDate ? 'text-[#131313]' : 'text-[#AFAFAF]'}`}
                            placeholder="Add date"
                        />
                        <Calendar className="h-6 w-6 stroke-[1.5] text-[#4A4A4A]" />
                    </div>
                </Field>

                {/* End Date */}
                <Field label={'End on'}>
                    <div className="flex items-center gap-2 rounded-sm border border-[#AFAFAF] px-3 py-3">
                        {' '}
                        <input
                            type="date"
                            value={data?.endDate || ''}
                            onChange={(e) => setData({ endDate: e.target.value })}
                            className={`flex-1 bg-transparent text-base font-normal outline-none ${data?.endDate ? 'text-[#131313]' : 'text-[#AFAFAF]'}`}
                            placeholder="Add date"
                        />
                        <Calendar className="h-6 w-6 stroke-[1.5] text-[#4A4A4A]" />
                    </div>
                </Field>
            </FieldSet>

            {/* Exam Fee Section */}
            <FieldSet className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <h3 className="flex-1 text-lg font-normal text-[#131313]">Exam fee</h3>
                    <button
                        onClick={() => setIsFeeEnabled(!isFeeEnabled)}
                        className={`flex h-6 w-6 items-center justify-center rounded-sm border-2 ${
                            isFeeEnabled ? 'border-[#0267FF] bg-[#0267FF]' : 'border-[#AFAFAF] bg-transparent'
                        }`}
                    >
                        {isFeeEnabled && <Check className="h-4 w-4 stroke-[2] text-white" />}
                    </button>
                </div>
                <div className="rounded-sm border border-[#AFAFAF] px-3 py-3">
                    <input
                        type="number"
                        placeholder="00 BDT"
                        value={data?.examFee || ''}
                        onChange={(e) => setData({ examFee: e.target.value })}
                        disabled={!isFeeEnabled}
                        className={`w-full bg-transparent text-right text-base font-normal outline-none ${
                            isFeeEnabled ? 'text-[#131313]' : 'text-[#AFAFAF]'
                        } placeholder:text-[#AFAFAF]`}
                    />
                </div>
            </FieldSet>

            {/* Select Class Section */}
            <ExamClassSelectFieldContainer data={data} setData={setData} />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-8">
                <button
                    onClick={onCancel}
                    className="flex h-14 flex-1 items-center justify-center rounded-lg bg-[#F2F2F2] px-4 py-3 text-base font-normal text-[#4A4A4A] transition-colors hover:bg-gray-300"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!data?.examName || !data?.startDate || !data?.endDate || data?.classes?.length === 0 || loading}
                    className="flex h-14 flex-1 items-center justify-center rounded-lg bg-[#0267FF] px-4 py-3 text-base font-normal text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create exam'}
                </button>
            </div>
        </div>
    );
};

export default ExamModalStepComponent;
