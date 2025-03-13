import { Link } from '@inertiajs/react';

const ClassView = ({ classes }) => {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex justify-between">
                <button className="cursor-pointer rounded bg-gray-500 px-4 py-2 text-white">Back</button>
                <Link href={route('class.create')} className="cursor-pointer rounded bg-green-500 px-4 py-2 text-white">
                    Create Class
                </Link>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2">Name</th>
                        <th className="border-b px-4 py-2">Category</th>
                        <th className="border-b px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classItem) => (
                        <tr key={classItem.id}>
                            <td className="border-b px-4 py-2">{classItem.name}</td>
                            <td className="border-b px-4 py-2">{classItem.department.name}</td>
                            <td className="border-b px-4 py-2">
                                <button className="mr-2 rounded bg-blue-500 px-2 py-1 text-white">Edit</button>
                                <button className="rounded bg-red-500 px-2 py-1 text-white">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default ClassView;
