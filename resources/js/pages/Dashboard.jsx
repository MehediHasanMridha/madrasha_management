import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="w-full bg-gray-400 py-4 text-center text-4xl">Here is the dashboard content</div>
        </AuthenticatedLayout>
    );
}
