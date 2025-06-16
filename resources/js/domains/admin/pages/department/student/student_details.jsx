import DepartmentTabSectionComponent from '@/Components/Department/DepartmentTabSectionComponent';
import BreadcrumbUI from '@/Components/UI/BreadcrumbUI';
import StudentDetailsContainer from '@/Container/Department/Student/StudentDetailsContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

const StudentDetails = ({ department }) => {
    return (
        <AuthenticatedLayout>
            <DepartmentTabSectionComponent type="students" department={department} />
            <div className="my-4">
                <BreadcrumbUI
                    items={[
                        { title: <Link href={route('department.students_show', { department_slug: department.slug })}>Students</Link> },
                        { title: 'Student Details', active: true },
                    ]}
                />
            </div>
            <StudentDetailsContainer />
        </AuthenticatedLayout>
    );
};

export default StudentDetails;
