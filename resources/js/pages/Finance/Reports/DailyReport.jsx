import DailyReportContainer from '@/Container/Finance/Reports/DailyReportContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const DailyReport = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Finance Daily Report" />
            <DailyReportContainer />
        </AuthenticatedLayout>
    );
};

export default DailyReport;
