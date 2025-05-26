import { Plus } from 'lucide-react';
import DepartmentListComponent from './DepartmentListComponent';

const DepartmentViewComponent = ({ departments, addModal }) => {
    return (
        <div className="min-h-screen bg-[#F8F8F8] p-6">
            {/* All Campuses Section */}
            <h1 className="mb-4 text-2xl font-bold">Manage Campus</h1>
            <div className="overflow-hidden rounded-lg bg-white">
                <div className="border-b border-[#AFAFAF] p-6">
                    <h2 className="text-[16px] font-[500] text-[#4A4A4A]">All campuses</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-2 lg:grid-cols-1">
                    <DepartmentListComponent departments={departments} />
                    <div className="rounded-xl bg-[#F2F2F2] p-8">
                        <div className="flex items-center gap-4">
                            <div
                                onClick={() => addModal({ add: true })}
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-white"
                            >
                                <Plus strokeWidth={1.5} size={20} />
                            </div>
                            <span className="text-lg text-[#AFAFAF]">Add new campus</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepartmentViewComponent;
