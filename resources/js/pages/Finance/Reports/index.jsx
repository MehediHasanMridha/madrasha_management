import ReportsContainer from '@/Container/Finance/Reports/ReportsContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Reports() {
    return (
        <AuthenticatedLayout>
            <Head title="Finance Monthly Reports" />
            <ReportsContainer />
        </AuthenticatedLayout>
    );
}
