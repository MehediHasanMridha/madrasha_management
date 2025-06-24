import DueDownloadContainer from '@/Container/Finance/Due/DueDownloadContainer';
import DueFilterContainer from '@/Container/Finance/Due/DueFilterContainer';
import DueTableListContainer from '@/Container/Finance/Due/DueTableListContainer';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const DueComponent = ({ data, filterData, filter, setSelectedFilters, selectedFilters }) => {
    return (
        <>
            <div className="space-y-6 py-6">
                <FinanceTabBarComponent tab="due_list" />
                <div className="rounded-lg bg-white p-6">
                    {/* Header with Download Button */}
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">Student Due List</h2>
                        <DueDownloadContainer filter={filter} selectedFilters={selectedFilters} />
                    </div>

                    <DueFilterContainer data={data} filterData={filterData} setSelectedFilters={setSelectedFilters} />
                    <DueTableListContainer data={data} />
                </div>
            </div>
        </>
    );
};

export default DueComponent;
