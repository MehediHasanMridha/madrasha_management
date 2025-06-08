import ExamsContainer from '@/Container/Department/Exams/ExamsContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

const exams = ({ department }) => {
    return (
        <AuthenticatedLayout>
            <ExamsContainer department={department} />
        </AuthenticatedLayout>
    );
};

export default exams;
