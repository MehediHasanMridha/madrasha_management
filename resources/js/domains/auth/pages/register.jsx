import { useForm } from '@inertiajs/react';

const Register = () => {
    const { post, submit, setData } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register.store'), {
            onError: (errors) => {
                console.log('🚀 ~ handleSubmit ~ errors:', errors);
            },
        });
    };
    return (
        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Name"
                    className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="Email"
                    className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Password"
                    className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password_confirmation">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="password_confirmation"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="focus:shadow-outline cursor-pointer rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
                >
                    Back
                </button>
            </div>
        </form>
    );
};

export default Register;
