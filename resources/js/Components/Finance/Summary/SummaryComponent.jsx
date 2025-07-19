import { Card, CardTitle } from '@/Components/UI/card';
import PieChartContainer from '@/Container/Finance/Summary/PieChartContainer';
import MonthYearContainer from '@/Container/Shared/MonthYearContainer';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const SummaryComponent = ({ data, getData, remainingAmount }) => {
    return (
        <div className="space-y-4 px-4 py-4 sm:px-0 sm:py-6">
            <FinanceTabBarComponent tab="summary" />
            <div className="flex flex-col space-y-4 rounded-lg bg-white p-4 sm:flex-row sm:justify-between sm:space-y-0 sm:p-6">
                <span className="text-base font-medium text-gray-700 sm:text-lg">
                    Remaining amount in this month : {remainingAmount.toLocaleString()} BDT
                </span>
                <MonthYearContainer getData={getData} />
            </div>
            <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
                {/* Earnings Card */}
                <Card className="rounded-lg border-none bg-white p-4 shadow-none sm:p-6">
                    <CardTitle className="text-lg sm:text-xl">Total Earnings</CardTitle>
                    {data?.earnings?.length !== 0 ? (
                        <PieChartContainer data={data?.earnings} />
                    ) : (
                        <div className="text-center text-base sm:text-lg">This month has no earning</div>
                    )}
                </Card>
                {/* Expenses Card */}
                <Card className="rounded-lg border-none bg-white p-4 shadow-none sm:p-6">
                    <CardTitle className="text-lg sm:text-xl">Total Expenses</CardTitle>
                    {data?.expenses?.length !== 0 ? (
                        <PieChartContainer data={data?.expenses} />
                    ) : (
                        <div className="text-center text-base sm:text-lg">This month has no expense</div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default SummaryComponent;
