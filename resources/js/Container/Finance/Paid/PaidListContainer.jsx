import PaidListComponent from '@/Components/Finance/Paid/PaidListComponent';
import { useState } from 'react';

const PaidListContainer = ({ data, filterData, filter }) => {
    const [selectedFilters, setSelectedFilters] = useState({});
    return (
        <PaidListComponent
            data={data}
            filterData={filterData}
            filter={filter}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
        />
    );
};

export default PaidListContainer;
