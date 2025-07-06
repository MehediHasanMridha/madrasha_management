import DepartmentTabSectionComponent from '@/Components/Department/DepartmentTabSectionComponent';
import ExamsComponent from '@/Components/Department/Exams/ExamsComponent';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import AddExamContainer from './AddExamContainer';
import EditExamContainer from './EditExamContainer';

const ExamsContainer = ({ department, classes, exams, availableYears = [], selectedYear }) => {
    const [yearFilter, setYearFilter] = useState(selectedYear || new Date().getFullYear());

    const handleYearChange = (year) => {
        setYearFilter(year);

        // Update URL with year filter
        const currentUrl = new URL(window.location);
        if (year === 'all') {
            currentUrl.searchParams.delete('year');
        } else {
            currentUrl.searchParams.set('year', year);
        }

        router.get(
            currentUrl.pathname + currentUrl.search,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <>
            <DepartmentTabSectionComponent type="exams" department={department} />
            <AddExamContainer classes={classes} department={department} />
            <EditExamContainer classes={classes} department={department} />
            <ExamsComponent
                exams={exams}
                yearFilter={yearFilter}
                availableYears={availableYears}
                handleYearChange={handleYearChange}
                department={department}
            />
        </>
    );
};

export default ExamsContainer;
