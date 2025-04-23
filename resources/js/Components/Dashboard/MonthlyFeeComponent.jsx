import ProgressbarUI from '../UI/ProgressbarUI';

const MonthlyFeeComponent = ({ data }) => {
    return (
        <div className="rounded-[8px] bg-white p-[24px]">
            <div className="text-base font-medium text-[#131313]">Monthly fee</div>
            <hr className="my-[12px] border-[1px] bg-[#AFAFAF]" />
            <div className="">
                <div className="flex items-end justify-start gap-1.5 py-[16px]">
                    <div className="text-[32px] leading-9 font-medium text-[#131313]">{data?.monthly_income}</div>
                    <div className="text-base font-normal text-[#afafaf]">/{data?.total_tk} BDT</div>
                </div>
                <div className="text-sm font-normal text-[#4a4a4a]">Total collected</div>
                <div className="flex h-[18px] items-center justify-start gap-4">
                    <div className="text-xs font-normal text-[#4a4a4a]">{data?.monthly_income} BDT</div>
                    <div className="w-[813px] shrink grow basis-0 items-center">
                        <ProgressbarUI
                            color={{
                                '0%': '#FFD016', //red
                                '100%': '#00a606',
                            }}
                            percent={(data?.monthly_income * 100) / data?.total_tk}
                        />
                    </div>
                    <div className="text-xs font-normal text-[#4a4a4a]">{data?.total_tk - data?.monthly_income} BDT</div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyFeeComponent;
