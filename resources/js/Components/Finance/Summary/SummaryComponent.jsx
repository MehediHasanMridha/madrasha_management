import { Card, CardTitle } from '@/Components/UI/card';
import PieChartContainer from '@/Container/Finance/Summary/PieChartContainer';
import MonthYearContainer from '@/Container/Shared/MonthYearContainer';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const SummaryComponent = ({ data, getData, remainingAmount }) => {
    return (
        <div className="space-y-4 py-6">
            <FinanceTabBarComponent tab="summary" />
            <div className="flex justify-between rounded-lg bg-white p-6">
                <span className="text-lg font-medium text-gray-700">Remaining amount in this month : {remainingAmount.toLocaleString()} BDT</span>
                <MonthYearContainer getData={getData} />
            </div>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Earnings Card */}
                <Card className="rounded-lg border-none bg-white p-6 shadow-none">
                    <CardTitle>Total Earnings</CardTitle>
                    {data?.earnings?.length !== 0 ? (
                        <PieChartContainer data={data?.earnings} />
                    ) : (
                        <div className="text-center text-lg">This month has no earning</div>
                    )}
                </Card>
                {/* Expenses Card */}
                <Card className="rounded-lg border-none bg-white p-6 shadow-none">
                    <CardTitle>Total Expenses</CardTitle>
                    {data?.expenses?.length !== 0 ? (
                        <PieChartContainer data={data?.expenses} />
                    ) : (
                        <div className="text-center text-lg">This month has no expense</div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default SummaryComponent;
