import { useForm } from '@inertiajs/react';

const Login = () => {
    const { post, setData } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login.store'));
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md">
                <h2 className="text-center text-2xl font-bold">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Email"
                            className="mt-1 w-full rounded-md border px-3 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            className="mt-1 w-full rounded-md border px-3 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none"
                    >
                        Login
                    </button>
                </form>
                <button
                    onClick={handleBack}
                    className="mt-4 w-full rounded bg-gray-600 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:ring focus:ring-gray-200 focus:outline-none"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default Login;
