import DueFilterContainer from '@/Container/Finance/Due/DueFilterContainer';
import DueTableListContainer from '@/Container/Finance/Due/DueTableListContainer';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const DueComponent = ({ data, filterData }) => {
    return (
        <>
            <div className="space-y-6 py-6">
                <FinanceTabBarComponent tab="due_list" />
                <div className="rounded-lg bg-white p-6">
                    <DueFilterContainer data={data} filterData={filterData} />
                    <DueTableListContainer data={data} />
                </div>
            </div>
        </>
    );
};

export default DueComponent;
