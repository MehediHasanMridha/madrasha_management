import LeftArrow from '@/assets/images/arrow-left.svg';
import StudentSectionContainer from '@/Container/Department/StudentSectionContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FaUserGroup } from 'react-icons/fa6';
const Dashboard = ({ department, students, filters, sortOrder }) => {
    const [tab, setTab] = useState('students');

    let content = null;

    switch (tab) {
        case 'students':
            content = <StudentSectionContainer department={department} students={students} filters={filters} sortOrder={sortOrder} />;
            break;
        case 'teachers':
            content = <div>Teachers</div>;
            break;
        default:
            break;
    }

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
            <div className="mt-[24px] flex space-x-[12px] rounded-[8px] bg-white p-[24px]">
                <span
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px] text-gray-500',
                        tab === 'students' && 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]',
                    )}
                    onClick={() => setTab('students')}
                >
                    <FaUserGroup className="inline-flex" size={24} />
                    <span className="text-[16px]">Students</span>
                </span>
                <span
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px] text-gray-500',
                        tab === 'teachers' && 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]',
                    )}
                    onClick={() => setTab('teachers')}
                >
                    <FaUserGroup className="inline-flex" size={24} />
                    <span className="text-[16px]">Teachers</span>
                </span>
            </div>
            {content}
        </AuthenticatedLayout>
    );
};

export default Dashboard;
