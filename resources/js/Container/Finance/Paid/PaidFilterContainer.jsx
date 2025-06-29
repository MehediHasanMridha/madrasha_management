import PaidFilterComponent from '@/Components/Finance/Paid/PaidFilterComponent';
import { router } from '@inertiajs/react';
import { useRef, useState } from 'react';

const PaidFilterContainer = ({ data, filterData, setSelectedFilters }) => {
    const [filters, setFilters] = useState({});
    const [filteredClasses, setFilteredClasses] = useState([]);
    const classRef = useRef();

    const { gender, class: classData, department } = filterData;

    // Function to get classes by department
    const getClassesByDepartment = (departmentId) => {
        if (!departmentId) return [];
        return classData.filter((cls) => cls.department_id === departmentId);
    };

    const handleFilterChange = (name, value) => {
        const parsedValue = name === 'filter' ? value : value ? JSON.parse(value) : null;
        setSelectedFilters((prev) => ({ ...prev, [name]: parsedValue?.name ?? parsedValue }));

        // Update filtered classes if department changes
        if (name === 'department') {
            if (!parsedValue) {
                delete filters['class'];
                setFilteredClasses([]);
                setSelectedFilters((prev) => ({ ...prev, class: null }));
            }
            if (classRef.current) {
                classRef.current.value = '';
            }
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

        router.get(route('finance.paid_list'), updatedFilters, {
            preserveState: true,
        });
    };

    return (
        <PaidFilterComponent
            classData={filteredClasses}
            department={department}
            gender={gender}
            handleFilterChange={handleFilterChange}
            ref={classRef}
        />
    );
};

export default PaidFilterContainer;
