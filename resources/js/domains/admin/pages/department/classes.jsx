import BreadcrumbUI from '@/Components/UI/BreadcrumbUI';
import SettingsLayout from '@/layouts/settings/SettingsLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Edit, PlusSquare, Trash2 } from 'lucide-react';

const Classes = ({ classes, department }) => {
    return (
        <SettingsLayout>
            <BreadcrumbUI
                items={[
                    {
                        title: (
                            <Link href={route('department.index')} as="button" className="flex cursor-pointer items-center gap-2">
                                <ArrowLeft />
                                {department?.name}
                            </Link>
                        ),
                    },
                    { title: 'Classes' },
                ]}
            />

            <div className="my-6 flex flex-col gap-4 rounded-lg bg-white pb-6">
                <div className="border-b border-gray-300 px-6 py-3">
                    <h2 className="text-lg font-normal text-gray-900">Manage Class</h2>
                </div>

                <div className="px-6">
                    <table className="min-w-full divide-y divide-gray-300 border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-4 text-left font-medium">Class</th>
                                <th className="border p-4 text-left font-medium">Boarding Fee</th>
                                <th className="border p-4 text-left font-medium">Academic Fee</th>
                                <th className="border p-4 text-left font-medium">Session Fee</th>
                                <th className="border p-4 text-center font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {classes?.map((classItem) => (
                                <tr key={classItem.id} className="hover:bg-gray-50">
                                    <td className="border p-4 text-gray-700">{classItem.name}</td>
                                    <td className="border p-4 text-right text-gray-700">{classItem.boarding_fee} BDT</td>
                                    <td className="border p-4 text-right text-gray-700">{classItem.academic_fee} BDT</td>
                                    <td className="border p-4 text-right text-gray-700">{classItem.session_fee} BDT</td>
                                    <td className="border p-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <button className="cursor-pointer rounded-lg p-[6px] text-gray-400 hover:bg-gray-200 hover:text-gray-600">
                                                <Edit size={16} />
                                            </button>
                                            <button className="cursor-pointer rounded-lg p-[6px] text-gray-400 hover:bg-gray-200 hover:text-red-600">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="5" className="border p-4">
                                    <button className="flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-400">
                                        <PlusSquare size={20} />
                                        <span className="font-medium">Add class</span>
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </SettingsLayout>
    );
};

export default Classes;
