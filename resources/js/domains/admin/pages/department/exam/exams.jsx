import ExamsContainer from '@/Container/Department/Exams/ExamsContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

const exams = ({ department, classes, exams }) => {
    return (
        <AuthenticatedLayout>
            <ExamsContainer department={department} classes={classes} exams={exams} />
        </AuthenticatedLayout>
    );
};

export default exams;
