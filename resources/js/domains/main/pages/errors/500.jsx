const InternalServerError = ({ message }) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="rounded-lg bg-white p-8 text-center shadow-lg">
                <h1 className="text-6xl font-bold text-red-500">500</h1>
                <p className="mt-4 text-xl text-gray-700">Internal Server Error</p>
                <p className="mt-2 text-gray-500">Something went wrong on our end. Please try again later.</p>
                <p className="mt-2 text-gray-500">{message}</p>
                <button onClick={() => window.location.reload()} className="mt-6 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Refresh Page
                </button>
            </div>
        </div>
    );
};

export default InternalServerError;
