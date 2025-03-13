import { Link } from '@inertiajs/react';

const DepartmentView = ({ departments }) => {
    const handleEdit = (id) => {
        console.log(`Edit department with id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete department with id: ${id}`);
    };

    const handleAdd = () => {
        console.log('Add new department');
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">Department View</h1>
            <Link
                href={route('department.create')}
                as="button"
                className="mb-4 cursor-pointer rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
                onClick={handleAdd}
            >
                Add Department
            </Link>
            <table className="min-w-full border border-gray-200 bg-white">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2">Name</th>
                        <th className="border-b px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department) => (
                        <tr key={department.id} className="hover:bg-gray-100">
                            <td className="border-b px-4 py-2">{department.name}</td>
                            <td className="border-b px-4 py-2">
                                <button
                                    className="mr-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-700"
                                    onClick={() => handleEdit(department.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-700"
                                    onClick={() => handleDelete(department.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentView;
