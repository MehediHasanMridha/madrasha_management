import DepartmentActionContainer from '@/Container/Department/DepartmentActionContainer';
import { Link } from '@inertiajs/react';
import { School } from 'lucide-react';

const DepartmentListComponent = ({ departments }) => {
    return departments.map((campus, index) => (
        <Link
            as="button"
            href={route('department.classes', {
                department_slug: campus.slug,
            })}
            key={campus.id}
            className="cursor-pointer rounded-xl bg-[#F2F2F2] p-8 transition-all duration-300 ease-in-out hover:bg-gray-300"
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                        <School strokeWidth={1.5} size={20} className="text-[#4A4A4A]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-medium text-[#131313]">{campus?.name}</h3>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-[#4A4A4A]">Total {campus.total_classes} Classes</span>
                        </div>
                    </div>
                </div>
                <DepartmentActionContainer data={campus} />
            </div>
        </Link>
    ));
};

export default DepartmentListComponent;
