import { Card, CardContent } from '@/Components/UI/card';
import ProgressbarUI from '@/Components/UI/ProgressbarUI';

const ExamFinanceComponent = ({ collectedAmount, totalAmount, progressPercentage, classData }) => {
    return (
        <>
            <Card className="w-full shadow-[0px_8px_24px_0px_rgba(0,0,0,0.04)]">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-3">
                        {/* Left side - Title */}
                        <h3 className="text-[20px] leading-[1.5em] font-[400] text-[#4A4A4A]">Total exam fee collected</h3>

                        {/* Right side - Amount and Progress */}
                        <div className="flex flex-col items-end gap-4">
                            {/* Amount Display */}
                            <div className="flex items-end gap-1.5">
                                <span className="text-[32px] leading-[1.12em] font-[500] text-[#131313]">{collectedAmount.toLocaleString()} BDT</span>
                                <span className="text-[32px] leading-[1.12em] font-[500] text-[#AFAFAF]">/{totalAmount.toLocaleString()} BDT</span>
                            </div>

                            {/* Progress Bar and Percentage */}
                            <div className="flex w-full items-center justify-end gap-2">
                                <ProgressbarUI
                                    percent={Math.round(progressPercentage)}
                                    color={{ '0%': '#FFD016', '100%': '#00a606' }}
                                    strokeWidth={8}
                                    showInfo
                                />
                                complete
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Class-wise Fee Collection Cards */}
            <div className="stretch mt-5 flex gap-5">
                {classData.map((classItem) => (
                    <Card key={classItem.id} className="flex-1 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.04)]">
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-3">
                                {/* Class Name and Progress */}
                                <div className="flex flex-col gap-0.5">
                                    <h4 className="text-[14px] leading-[1.5em] font-[400] text-[#4A4A4A]">{classItem.name}</h4>

                                    {/* Progress Bar */}
                                    <ProgressbarUI
                                        percent={Math.round((classItem.collected * 100) / classItem.total)}
                                        color={{ '0%': '#FFD016', '100%': '#00a606' }}
                                        strokeWidth={4}
                                        showInfo
                                    />
                                </div>

                                {/* Amount Display */}
                                <div className="flex items-end gap-1.5">
                                    <span className="text-[20px] leading-[1.5em] font-[500] text-[#131313]">
                                        {classItem.collected.toLocaleString()}
                                    </span>
                                    <span className="text-[20px] leading-[1.5em] font-[500] text-[#AFAFAF]">
                                        /{classItem.total.toLocaleString()} BDT
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default ExamFinanceComponent;
