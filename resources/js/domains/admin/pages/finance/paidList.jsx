import PaidListContainer from '@/Container/Finance/Paid/PaidListContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const PaidList = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Paid List" />
            <PaidListContainer />
        </AuthenticatedLayout>
    );
};

export default PaidList;
