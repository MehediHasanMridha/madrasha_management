import DueContainer from '@/Container/Finance/Due/DueContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const dueList = ({ data, filterData }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Student Due List" />
            <DueContainer data={data} filterData={filterData} />
        </AuthenticatedLayout>
    );
};

export default dueList;
