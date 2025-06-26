import DailyReportContainer from '@/Container/Finance/Reports/DailyReportContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Deferred, Head } from '@inertiajs/react';

const DailyReport = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Finance Daily Report" />
            <Deferred
                data="approvedReports"
                fallback={
                    <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                            <p className="mb-4 text-gray-500">Loading report data...</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>
                }
            >
                <DailyReportContainer />
            </Deferred>
        </AuthenticatedLayout>
    );
};

export default DailyReport;
