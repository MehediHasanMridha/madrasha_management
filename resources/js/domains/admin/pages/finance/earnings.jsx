import EarningContainer from '@/Container/Finance/Earnings/EarningContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Earnings() {
    return (
        <AuthenticatedLayout>
            <Head title="Finance Earnings" />
            <EarningContainer />
        </AuthenticatedLayout>
    );
}
