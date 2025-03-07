import LeftArrow from '@/assets/images/arrow-left.svg';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DepartmentTabsSection from '../../Container/Department/DepartmentTabsSection';
const Dashboard = () => {
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
            <DepartmentTabsSection />
        </AuthenticatedLayout>
    );
};

export default Dashboard;
