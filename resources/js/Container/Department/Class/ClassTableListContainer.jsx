import { useDepartmentStore } from '@/stores';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { Edit, PlusSquare, Trash2 } from 'lucide-react';

const ClassTableListContainer = ({ classes = [], department }) => {
    const { setModal } = useDepartmentStore((state) => state);

    const handleDelete = (classItem) => {
        if (window.confirm(`Are you sure you want to delete ${classItem.name}?`)) {
            router.delete(route('department.class_delete', { class_slug: classItem?.slug }), {
                onSuccess: (res) => {
                    if (res.props?.flash?.error) {
                        notification.error({
                            message: 'Error',
                            description: res.props?.flash?.error,
                            placement: 'bottomRight',
                        }); // Replace with your error handling logic
                    }
                    if (res.props?.flash?.success) {
                        notification.success({
                            message: 'Success',
                            description: res.props?.flash?.success,
                            placement: 'bottomRight',
                        }); // Replace with your success handling logic
                    }
                },
                onError: (error) => {
                    notification.error({
                        message: 'Error',
                        description: 'Failed to delete class. Please try again.',
                        placement: 'bottomRight',
                    });
                },
            });
        }
    };
    return (
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
                {classes?.map((classItem) => {
                    const boarding_fee = classItem?.fee_types?.find((fee) => fee.name === 'Boarding Fee')?.amount;
                    const academic_fee = classItem?.fee_types?.find((fee) => fee.name === 'Academic Fee')?.amount;
                    const session_fee = classItem?.fee_types?.find((fee) => fee.name === 'Admission Fee')?.amount;
                    return (
                        <tr key={classItem.id} className="hover:bg-gray-50">
                            <td className="border p-4 text-gray-700">{classItem.name}</td>
                            <td className="border p-4 text-right text-gray-700">{boarding_fee} BDT</td>
                            <td className="border p-4 text-right text-gray-700">{academic_fee} BDT</td>
                            <td className="border p-4 text-right text-gray-700">{session_fee} BDT</td>
                            <td className="border p-4">
                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => setModal({ edit: true, data: classItem })}
                                        className="cursor-pointer rounded-lg p-[6px] text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(classItem)}
                                        className="cursor-pointer rounded-lg p-[6px] text-gray-400 hover:bg-gray-200 hover:text-red-600"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="5" className="border p-4">
                        <button
                            onClick={() => setModal({ add: true, data: department })}
                            className="flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-400"
                        >
                            <PlusSquare size={20} />
                            <span className="font-medium">Add class</span>
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default ClassTableListContainer;
