import { useBoundStore } from '@/stores';
import { usePage } from '@inertiajs/react';

const FeeDepartmentDropdownContainer = () => {
    const { manageFeeData, setManageFeeData } = useBoundStore((state) => state);
    const { departments } = usePage().props;
    if (manageFeeData?.department === null) {
        setManageFeeData({ department: departments[0].slug });
    }

    return (
        <select
            onChange={(e) => setManageFeeData({ department: e.target.value, class: null })}
            className="appearance-none rounded border bg-white px-4 py-1 pr-8 text-sm focus:outline-none"
        >
            <option disabled>Select campus</option>
            {/* Add options here */}
            {departments.map((department) => (
                <option key={department.id} value={department.slug} selected={department.slug === manageFeeData.department}>
                    {department.name}
                </option>
            ))}
        </select>
    );
};

export default FeeDepartmentDropdownContainer;
