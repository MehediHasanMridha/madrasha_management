import MonthYearContainer from '@/Container/Shared/MonthYearContainer';
import { forwardRef } from 'react';

const DueFilterComponent = forwardRef(({ classData, department, gender, handleFilterChange, classRef, getMonthYearData }) => {
    return (
        <div className="flex items-center justify-between gap-4 rounded-lg p-4">
            <select
                className="filter-dropdown w-full rounded border border-gray-400 px-2 py-2 focus:outline-none"
                name="department"
                onChange={handleFilterChange}
            >
                <option value="select">Select Department</option>
                {department?.map((item, index) => (
                    <option key={index} value={JSON.stringify(item)}>
                        {item.name}
                    </option>
                ))}
                {/* Add more departments as needed */}
            </select>
            <select
                className="filter-dropdown w-full rounded border border-gray-400 px-2 py-2 focus:outline-none"
                name="class"
                onChange={handleFilterChange}
                ref={classRef}
            >
                <option value="select">Select Class</option>
                {classData?.map((item, index) => (
                    <option key={index} value={JSON.stringify(item)}>
                        {item.name}
                    </option>
                ))}
                {/* Add more classes as needed */}
            </select>
            <select
                className="filter-dropdown w-full rounded border border-gray-400 px-2 py-2 focus:outline-none"
                name="gender"
                onChange={handleFilterChange}
            >
                <option value="select">Select Gender</option>
                {gender?.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <MonthYearContainer getData={getMonthYearData} className="filter-dropdown rounded border border-gray-400 px-2 py-2 focus:outline-none" />
        </div>
    );
});

export default DueFilterComponent;
