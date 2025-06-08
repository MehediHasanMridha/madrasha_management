import DueFilterComponent from '@/Components/Finance/Due/DueFilterComponent';
import { router } from '@inertiajs/react';
import { useRef, useState } from 'react';

const DueFilterContainer = ({ data, filterData }) => {
    const [filters, setFilters] = useState({});
    const [filteredClasses, setFilteredClasses] = useState([]);
    const { class: classData = [], department, gender, fee_type } = filterData;
    const classRef = useRef();

    const getClassesByDepartment = (departmentId) => {
        return departmentId ? classData.filter((cls) => cls.department_id == departmentId) : [];
    };

    const parseValue = (value) => {
        try {
            return JSON.parse(value);
        } catch {
            return value === 'select' ? null : value;
        }
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        const parsedValue = parseValue(value);
        console.log('🚀 ~ handleFilterChange ~ parsedValue:', parsedValue);

        // Update filtered classes if department changes
        if (name === 'department') {
            if (!parsedValue) {
                delete filters['class'];
                setFilteredClasses([]);
            }
            classRef.current.value = 'Select Class';
            const departmentId = parsedValue?.id;
            setFilteredClasses(getClassesByDepartment(departmentId));
        }

        // Update filters
        const updatedFilters = { ...filters };
        if (parsedValue) {
            updatedFilters[name] = parsedValue?.slug ?? parsedValue;
        } else {
            delete updatedFilters[name];
        }
        setFilters(updatedFilters);

        router.get(route('finance.due_list'), updatedFilters, {
            preserveState: true,
        });
    };

    const getMonthYearData = (month, year) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            month,
            year,
        }));
        router.get(
            route('finance.due_list'),
            { ...filters, month, year },
            {
                preserveState: true,
            },
        );
    };

    return (
        <DueFilterComponent
            classData={filteredClasses}
            department={department}
            gender={gender}
            feeType={fee_type}
            handleFilterChange={handleFilterChange}
            classRef={classRef}
            getMonthYearData={getMonthYearData}
        />
    );
};

export default DueFilterContainer;
