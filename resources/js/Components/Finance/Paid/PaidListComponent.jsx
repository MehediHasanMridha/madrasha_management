import PaidDownloadContainer from '@/Container/Finance/Paid/PaidDownloadContainer';
import PaidFilterContainer from '@/Container/Finance/Paid/PaidFilterContainer';
import PaidListTableContainer from '@/Container/Finance/Paid/PaidListTableContainer';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const PaidListComponent = ({ data, filterData, filter, setSelectedFilters, selectedFilters }) => {
    return (
        <>
            <div className="space-y-6 py-6">
                <FinanceTabBarComponent tab="paid_list" />
                <div className="rounded-lg bg-white p-6">
                    {/* Header with Download Button */}
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">Student Paid List</h2>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                                Filter: <span className="font-medium capitalize">{filter?.filter?.replace('_', ' ')}</span>
                            </div>
                            <PaidDownloadContainer filter={filter} selectedFilters={selectedFilters} />
                        </div>
                    </div>

                    <PaidFilterContainer data={data} filterData={filterData} setSelectedFilters={setSelectedFilters} />
                    <PaidListTableContainer data={data} />
                </div>
            </div>
        </>
    );
};

export default PaidListComponent;
