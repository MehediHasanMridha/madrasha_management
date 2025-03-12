import LeftArrow from '@/assets/images/arrow-left.svg';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StudentSectionContainer from '../../Container/Department/StudentSectionContainer';
const Dashboard = ({ department, students, filters, sortOrder }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Islamic School" />
            <div className="inline-flex h-6 items-center justify-start gap-0.5">
                <img src={LeftArrow} alt="arrow" className="h-[24px] w-[24px]" />
                <div className="inline-flex space-x-0.5 text-base font-normal text-[#afafaf]">
                    <span>Islamic school</span>
                    <span>/</span>
                    <span>Student</span>
                </div>
            </div>
            <StudentSectionContainer department={department} students={students} filters={filters} sortOrder={sortOrder} />
        </AuthenticatedLayout>
    );
};

export default Dashboard;
