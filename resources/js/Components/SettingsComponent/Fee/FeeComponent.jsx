import BreadcrumbUI from '@/Components/UI/BreadcrumbUI';
import FeeClassSectionContainer from '@/Container/SettingsContainer/Fee/FeeClassSectionContainer';
import FeeTableListContainer from '@/Container/SettingsContainer/Fee/FeeTableListContainer';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const FeeComponent = ({ fee = [], setAddFeeModal, setEditFeeModal, setEditData, departments }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Breadcrumb */}
            <BreadcrumbUI items={[{ title: <Link href={route('fee.fee_categories')}>Manage fee</Link> }, { title: 'Islamic school' }]} />

            {/* Header with Add Class and Assign Teacher buttons */}
            <div className="my-6 flex items-center justify-between">
                <div className="flex w-full items-center justify-between">
                    <select className="appearance-none rounded border bg-white px-4 py-1 pr-8 text-sm">
                        <option>Select campus</option>
                        {/* Add options here */}
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex items-center">
                        <button className="ml-3 flex items-center text-sm font-medium text-blue-500">
                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 110-20 10 10 0 010 20z" />
                            </svg>
                            View details
                        </button>
                    </div>
                </div>
            </div>

            {/* Class List Sidebar and Fee Table Layout */}
            <div className="flex">
                <FeeClassSectionContainer />

                {/* Fee Management Table */}
                <div className="w-2/3">
                    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                        {/* Table Header */}
                        <FeeTableListContainer />

                        {/* Add Fee Button */}
                        <div className="p-4">
                            <button className="flex items-center gap-1 text-sm text-blue-500" onClick={() => setAddFeeModal(true)}>
                                <Plus />
                                Add fee
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeeComponent;
