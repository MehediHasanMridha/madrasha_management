import DailyReportContainer from '@/Container/Finance/Reports/DailyReportContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const DailyReport = ({ approvedReports }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Finance Daily Report" />
            <DailyReportContainer approvedReports={approvedReports} />
        </AuthenticatedLayout>
    );
};

export default DailyReport;
