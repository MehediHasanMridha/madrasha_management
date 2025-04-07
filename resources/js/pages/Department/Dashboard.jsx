import StudentSectionContainer from '@/Container/Department/Student/StudentSectionContainer';
import TeacherSectionContainer from '@/Container/Department/Teacher/TeacherSectionContainer';
import { TeacherSectionProvider } from '@/contextApi&reducer/Department/TeacherContextApi';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { cn, deleteAllUrlParams, deleteUrlParams, getUrlParams, setUrlParams } from '@/lib/utils';
import { Head, WhenVisible } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaUserGroup } from 'react-icons/fa6';

const Dashboard = ({ department, students, filters, sortOrder }) => {
    const [tab, setTab] = useState(() => (getUrlParams() === 'staff' ? 'staff' : 'student'));

    useEffect(() => {
        if (tab === 'staff') {
            setUrlParams('staff');
        } else {
            deleteUrlParams();
        }
    }, [tab]);

    let content = null;

    switch (tab) {
        case 'student':
            content = <StudentSectionContainer department={department} students={students} filters={filters} sortOrder={sortOrder} />;
            break;
        case 'staff':
            content = (
                <WhenVisible data={'staff'} fallback={<div>Loading...</div>}>
                    <TeacherSectionProvider value={{ tab, setTab }}>
                        <TeacherSectionContainer department={department} />
                    </TeacherSectionProvider>
                </WhenVisible>
            );
            break;
        default:
            break;
    }

    return (
        <AuthenticatedLayout>
            <Head title="Islamic School" />
            <div className="mt-[24px] flex space-x-[12px] rounded-[8px] bg-white p-[24px]">
                <span
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px] text-gray-500',
                        tab === 'student' && 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]',
                    )}
                    onClick={() => {
                        deleteAllUrlParams();
                        setTab('student');
                    }}
                >
                    <FaUserGroup className="inline-flex" size={24} />
                    <span className="text-[16px]">Students</span>
                </span>
                <span
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px] text-gray-500',
                        tab === 'staff' && 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]',
                    )}
                    onClick={() => {
                        deleteAllUrlParams();
                        setTab('staff');
                    }}
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
