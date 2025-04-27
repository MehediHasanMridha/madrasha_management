import DepartmentTabSectionComponent from '@/Components/Department/DepartmentTabSectionComponent';
import TeacherSectionContainer from '@/Container/Department/Teacher/TeacherSectionContainer';
import { TeacherSectionProvider } from '@/contextApi&reducer/Department/TeacherContextApi';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, WhenVisible } from '@inertiajs/react';

const Teachers = ({ department }) => {
    return (
        <AuthenticatedLayout>
            <Head title={department?.name} />
            <DepartmentTabSectionComponent type="teachers" department={department} />
            <WhenVisible data={'staff'} fallback={<div>Loading...</div>}>
                <TeacherSectionProvider>
                    <TeacherSectionContainer department={department} />
                </TeacherSectionProvider>
            </WhenVisible>
        </AuthenticatedLayout>
    );
};

export default Teachers;
