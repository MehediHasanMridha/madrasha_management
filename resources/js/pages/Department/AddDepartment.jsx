import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddDepartment = () => {
    const [departmentName, setDepartmentName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSubmitData = (data) => {
        router.post(route('department.store'), data);
    };

    const handleBack = () => {};

    return (
        <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-md">
            <Link
                as="button"
                href={route('department')}
                className="mb-4 cursor-pointer rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
            >
                Back
            </Link>
            <h2 className="mb-6 text-2xl font-bold">Add Department</h2>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="departmentName">
                        Department Name
                    </label>
                    <input
                        type="text"
                        id="departmentName"
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        placeholder="Enter department name"
                        {...register('name', { required: true })}
                    />
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        {...register('description')}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        placeholder="Enter description"
                    />
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="icon">
                        Icon
                    </label>
                    <input
                        type="text"
                        id="icon"
                        {...register('icon', { required: true })}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        placeholder="Enter icon URL"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                    >
                        Add Department
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDepartment;
