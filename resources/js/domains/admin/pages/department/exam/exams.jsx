import ExamsContainer from '@/Container/Department/Exams/ExamsContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

const exams = ({ department, classes, exams, availableYears, selectedYear }) => {
    return (
        <AuthenticatedLayout>
            <ExamsContainer department={department} classes={classes} exams={exams} availableYears={availableYears} selectedYear={selectedYear} />
        </AuthenticatedLayout>
    );
};

export default exams;
