import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddClass = ({ departments }) => {
    const [className, setClassName] = useState('');
    const [category, setCategory] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSubmitData = (data) => {
        console.log('🚀 ~ handleSubmitData ~ data:', data);
        router.post(route('class.store'), data);
        // Handle form submission
    };

    return (
        <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold">Add Class</h2>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="className">
                        Class Name
                    </label>
                    <input
                        type="text"
                        id="className"
                        {...register('name', { required: true })}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        placeholder="Enter class name"
                    />
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="category">
                        Category
                    </label>
                    <select
                        {...register('department', { required: true })}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    >
                        <option value="">Select category</option>
                        {departments.map((department) => (
                            <option value={department.id} key={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                    >
                        Add Class
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;
