import SummaryContainer from '@/Container/Finance/Summary/SummaryContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Summary({ data }) {
    return (
        <AuthenticatedLayout>
            <Head title="Finance Summary" />
            <SummaryContainer data={data} />
        </AuthenticatedLayout>
    );
}
