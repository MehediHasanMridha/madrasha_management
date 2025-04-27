import DepartmentTabSectionComponent from '@/Components/Department/DepartmentTabSectionComponent';
import StudentSectionContainer from '@/Container/Department/Student/StudentSectionContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, WhenVisible } from '@inertiajs/react';

const Students = ({ department }) => {
    return (
        <AuthenticatedLayout>
            <Head title={department?.name} />
            <DepartmentTabSectionComponent type="students" department={department} />
            <WhenVisible data={'students'} fallback={<div>Loading...</div>}>
                <StudentSectionContainer department={department} />
            </WhenVisible>
        </AuthenticatedLayout>
    );
};

export default Students;
