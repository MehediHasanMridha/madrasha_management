import SettingDropdownContainer from '@/Container/Shared/SettingDropdownContainer';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { FaUserGroup } from 'react-icons/fa6';

const DepartmentTabSectionComponent = ({ department, type }) => {
    return (
        <div className="mt-[24px] flex w-full items-center justify-between rounded-[8px] bg-white p-[24px]">
            <div className="flex space-x-[12px]">
                <Link
                    href={route('department.students_show', { department_slug: department.slug })}
                    as="button"
                    preserveState
                    preserveScroll
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px]',
                        type === 'students' ? 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]' : 'text-gray-500',
                    )}
                >
                    <FaUserGroup className="inline-flex" size={24} />
                    <span className="text-[16px]">Students</span>
                </Link>
                <Link
                    href={route('department.teachers_show', { department_slug: department.slug })}
                    as="button"
                    preserveState
                    preserveScroll
                    className={cn(
                        'flex w-fit cursor-pointer items-center space-x-[8px]',
                        type === 'teachers' ? 'border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]' : 'text-gray-500',
                    )}
                >
                    <FaUserGroup className="inline-flex" size={24} />
                    <span className="text-[16px]">Teachers</span>
                </Link>
            </div>
            <SettingDropdownContainer />
        </div>
    );
};

export default DepartmentTabSectionComponent;
