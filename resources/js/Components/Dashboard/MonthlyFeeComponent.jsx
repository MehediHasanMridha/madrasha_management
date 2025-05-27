import { formattedAmount } from '@/lib/utils';
import ProgressbarUI from '../UI/ProgressbarUI';

const MonthlyFeeComponent = ({ data }) => {
    return (
        <div className="rounded-[8px] bg-white p-4 sm:p-6 lg:p-[24px]">
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
                <div className="text-sm font-medium text-[#131313] sm:text-base">Monthly fee</div>
                <div className="text-sm font-medium text-[#131313] sm:text-base">Monthly fee</div>
            </div>
            <hr className="my-[12px] border-[1px] bg-[#AFAFAF]" />
            <div className="">
                <div className="flex items-end justify-start gap-1.5 py-[16px]">
                    <div className="text-2xl leading-9 font-medium text-[#131313] sm:text-3xl lg:text-[32px]">
                        {formattedAmount(data?.monthly_income)}
                    </div>
                    <div className="text-sm font-normal text-[#afafaf] sm:text-base">/{formattedAmount(data?.total_tk)} BDT</div>
                </div>
                <div className="text-xs font-normal text-[#4a4a4a] sm:text-sm">Total collected</div>
                <div className="flex h-auto flex-col items-start justify-start gap-2 sm:h-[18px] sm:flex-row sm:items-center sm:gap-4">
                    <div className="text-xs font-normal whitespace-nowrap text-[#4a4a4a]">{formattedAmount(data?.monthly_income)} BDT</div>
                    <div className="w-full items-center sm:flex-1">
                        <ProgressbarUI
                            color={{
                                '0%': '#FFD016', //red
                                '100%': '#00a606',
                            }}
                            percent={(data?.monthly_income * 100) / data?.total_tk}
                        />
                    </div>
                    <div className="text-xs font-normal whitespace-nowrap text-[#4a4a4a]">
                        {formattedAmount(data?.total_tk - data?.monthly_income)} BDT
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyFeeComponent;
