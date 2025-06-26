import DailyReportContainer from '@/Container/Finance/Reports/DailyReportContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Deferred, Head } from '@inertiajs/react';

const DailyReport = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Finance Daily Report" />
            <Deferred data="approvedReports" fallback={<div>Loading...</div>}>
                <DailyReportContainer />
            </Deferred>
        </AuthenticatedLayout>
    );
};

export default DailyReport;
