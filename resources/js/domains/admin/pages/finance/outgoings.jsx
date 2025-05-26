import OutgoingContainer from '@/Container/Finance/Outgoings/OutgoingContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Outgoings({ outgoings, voucherList }) {
    return (
        <AuthenticatedLayout>
            <Head title="Finance Outgoings" />
            <OutgoingContainer outgoings={outgoings} voucherList={voucherList} />
        </AuthenticatedLayout>
    );
}
