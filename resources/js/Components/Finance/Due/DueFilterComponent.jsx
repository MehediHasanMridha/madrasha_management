import MonthYearContainer from '@/Container/Shared/MonthYearContainer';

const DueFilterComponent = ({ classData, department, gender, handleFilterChange }) => {
    return (
        <div className="flex items-center gap-4 rounded-lg p-4">
            <select
                className="filter-dropdown rounded border border-gray-400 px-2 py-2 focus:outline-none"
                name="class"
                onChange={handleFilterChange}
            >
                <option value="">Select Class</option>
                {classData?.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
                {/* Add more classes as needed */}
            </select>
            <select
                className="filter-dropdown rounded border border-gray-400 px-2 py-2 focus:outline-none"
                name="department"
                onChange={handleFilterChange}
            >
                <option value="">Select Department</option>
                {department?.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
                {/* Add more departments as needed */}
            </select>
            <select
                className="filter-dropdown rounded border border-gray-400 px-2 py-2 focus:outline-none"
                name="gender"
                onChange={handleFilterChange}
            >
                <option value="">Select Gender</option>
                {gender?.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <MonthYearContainer className="filter-dropdown rounded border border-gray-400 px-2 py-2 focus:outline-none" />
        </div>
    );
};

export default DueFilterComponent;
