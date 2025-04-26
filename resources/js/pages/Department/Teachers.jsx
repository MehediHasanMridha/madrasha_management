import TeacherSectionContainer from '@/Container/Department/Teacher/TeacherSectionContainer';
import SettingDropdownContainer from '@/Container/Shared/SettingDropdownContainer';
import { TeacherSectionProvider } from '@/contextApi&reducer/Department/TeacherContextApi';
import { useDistricts } from '@/hooks/api/useDistricts';
import { useUpazillas } from '@/hooks/api/useUpazilla';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, router, WhenVisible } from '@inertiajs/react';
import { useState } from 'react';
import { FaUserGroup } from 'react-icons/fa6';

const Teachers = ({ department }) => {
    const { data: districts } = useDistricts();
    const [districtId, setDistrictId] = useState(null);
    const { data: upazillas } = useUpazillas(districtId);
    return (
        <AuthenticatedLayout>
            <Head title={department?.name} />
            <div className="mt-[24px] flex w-full items-center justify-between rounded-[8px] bg-white p-[24px]">
                <div className="flex space-x-[12px]">
                    <span className="flex w-fit cursor-pointer items-center space-x-[8px] text-gray-500">
                        <FaUserGroup className="inline-flex" size={24} />
                        <span
                            className="text-[16px]"
                            onClick={() => {
                                router.get(
                                    route('department.students_show', {
                                        department_slug: department.slug,
                                    }),
                                    {},
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                    },
                                );
                            }}
                        >
                            Students
                        </span>
                    </span>
                    <span className="flex w-fit cursor-pointer items-center space-x-[8px] border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]">
                        <FaUserGroup className="inline-flex" size={24} />
                        <span className="text-[16px]">Teachers</span>
                    </span>
                </div>
                <SettingDropdownContainer />
            </div>
            <WhenVisible data={'staff'} fallback={<div>Loading...</div>}>
                <TeacherSectionProvider>
                    <TeacherSectionContainer department={department} />
                </TeacherSectionProvider>
            </WhenVisible>
        </AuthenticatedLayout>
    );
};

export default Teachers;
