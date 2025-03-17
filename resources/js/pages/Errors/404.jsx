import { Link } from '@inertiajs/react';

const NotFound = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <p className="mt-4 text-2xl font-semibold text-gray-600">Page Not Found</p>
                <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
                <Link href="/" className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-700">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
