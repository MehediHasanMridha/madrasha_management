import { forwardRef } from 'react';

const PaidFilterComponent = forwardRef(({ classData, department, gender, handleFilterChange }, classRef) => {
    return (
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Filter Paid Students</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Filter Type */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Filter By</label>
                    <select
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
                        onChange={(e) => handleFilterChange('filter', e.target.value)}
                        defaultValue="today"
                    >
                        <option value="today">Today</option>
                        <option value="this_month">This Month</option>
                    </select>
                </div>

                {/* Gender Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Gender</label>
                    <select
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
                        onChange={(e) => handleFilterChange('gender', e.target.value)}
                    >
                        <option value="">All Genders</option>
                        {gender.map((genderOption) => (
                            <option key={genderOption} value={genderOption}>
                                {genderOption.charAt(0).toUpperCase() + genderOption.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Department Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Department</label>
                    <select
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
                        onChange={(e) => handleFilterChange('department', e.target.value)}
                    >
                        <option value="">All Departments</option>
                        {department.map((dept) => (
                            <option key={dept.id} value={JSON.stringify(dept)}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Class Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Class</label>
                    <select
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
                        ref={classRef}
                        onChange={(e) => handleFilterChange('class', e.target.value)}
                    >
                        <option value="">All Classes</option>
                        {classData.map((cls) => (
                            <option key={cls.id} value={JSON.stringify(cls)}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
});

PaidFilterComponent.displayName = 'PaidFilterComponent';

export default PaidFilterComponent;
