import DueComponent from '@/Components/Finance/Due/DueComponent';
import { useState } from 'react';

const DueContainer = ({ data, filterData, filter }) => {
    const [selectedFilters, setSelectedFilters] = useState({});
    return (
        <DueComponent data={data} filterData={filterData} filter={filter} setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters} />
    );
};

export default DueContainer;
