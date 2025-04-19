import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function MonthlyReports() {
    return (
        <AuthenticatedLayout>
            <Head title="Finance Monthly Reports" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-2xl font-semibold text-gray-900">Finance - Monthly Reports</h2>

                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <p className="text-gray-600">Monthly Reports page is under development.</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
