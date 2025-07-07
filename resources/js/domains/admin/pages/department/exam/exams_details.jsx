import DepartmentTabSectionComponent from '@/Components/Department/DepartmentTabSectionComponent';
import BreadcrumbUI from '@/Components/UI/BreadcrumbUI';
import ExamDetailsContainer from '@/Container/Department/Exams/ExamDetails/ExamDetailsContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

const Exams_details = ({ exam, department, classes }) => {
    return (
        <AuthenticatedLayout>
            <DepartmentTabSectionComponent type="exams" department={department} className="mb-5" />
            <div className="mt-5">
                <BreadcrumbUI
                    items={[
                        { title: <Link href={route('department.exams_show', { department_slug: department.slug })}>Exams</Link> },
                        {
                            title: (
                                <Link href={route('department.exams_details', { exam_slug: exam.slug, department_slug: department.slug })}>
                                    {' '}
                                    {exam.name}
                                </Link>
                            ),
                        },
                    ]}
                />
            </div>
            <ExamDetailsContainer exam={exam} department={department} classes={classes} />
        </AuthenticatedLayout>
    );
};

export default Exams_details;
