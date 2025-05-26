import DashboardContainer from '@/Container/Dashboard/DashboardContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
export default function Dashboard({ data, auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <DashboardContainer data={data} auth={auth} />
        </AuthenticatedLayout>
    );
}
