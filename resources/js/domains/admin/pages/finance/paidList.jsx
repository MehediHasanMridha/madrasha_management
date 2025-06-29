import PaidListContainer from '@/Container/Finance/Paid/PaidListContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const PaidList = ({ data, filterData, filter }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Paid List" />
            <PaidListContainer data={data} filterData={filterData} filter={filter} />
        </AuthenticatedLayout>
    );
};

export default PaidList;
