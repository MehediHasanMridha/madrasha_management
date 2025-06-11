import ExamsContainer from '@/Container/Department/Exams/ExamsContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

const exams = ({ department, classes }) => {
    return (
        <AuthenticatedLayout>
            <ExamsContainer department={department} classes={classes} />
        </AuthenticatedLayout>
    );
};

export default exams;
