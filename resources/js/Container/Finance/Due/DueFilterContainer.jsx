import DueFilterComponent from '@/Components/Finance/Due/DueFilterComponent';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const DueFilterContainer = ({ data, filterData }) => {
    const [filters, setFilters] = useState();
    const { class: classData, department, gender, feeType } = filterData;

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        // Remove the filter if value is empty, otherwise set it
        const updatedFilters = { ...filters };
        if (value) {
            updatedFilters[name] = value;
        } else {
            delete updatedFilters[name];
        }
        setFilters(updatedFilters);

        router.get(route('finance.due_list'), updatedFilters, {
            preserveState: true,
            replace: true,
            onSuccess: () => {
                console.log('Filter applied successfully');
            },
            onError: (error) => {
                console.error('Error applying filter:', error);
            },
            onFinish: () => {
                console.log('Filter request finished');
            },
        });
    };

    return (
        <DueFilterComponent classData={classData} department={department} gender={gender} feeType={feeType} handleFilterChange={handleFilterChange} />
    );
};

export default DueFilterContainer;
