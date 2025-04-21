import OutgoingContainer from '@/Container/Finance/Outgoings/OutgoingContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Outgoings() {
    return (
        <AuthenticatedLayout>
            <Head title="Finance Outgoings" />
            <OutgoingContainer />
        </AuthenticatedLayout>
    );
}
