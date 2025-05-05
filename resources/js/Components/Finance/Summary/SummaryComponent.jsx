import { Card, CardTitle } from '@/Components/UI/card';
import MonthYearContainer from '@/Container/Shared/MonthYearContainer';
import FinanceTabBarComponent from '../FinanceTabBarComponent';
import EarningPieChartContainer from './EarningPieChartContainer';

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
                    <EarningPieChartContainer data={data} />
                </Card>
                {/* Expenses Card */}
                <Card className="rounded-lg border-none bg-white p-6 shadow-none">
                    <CardTitle>Total Expenses</CardTitle>
                    <div className="flex h-full items-center justify-center text-lg">Under development</div>
                </Card>
            </div>
        </div>
    );
};

export default SummaryComponent;
