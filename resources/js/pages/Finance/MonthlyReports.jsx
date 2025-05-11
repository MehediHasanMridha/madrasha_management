import coming_soon from '@/assets/images/coming_soon.svg';
import FinanceTabBarComponent from '@/Components/Finance/FinanceTabBarComponent';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function MonthlyReports() {
    return (
        <AuthenticatedLayout>
            <Head title="Finance Monthly Reports" />
            <div className="py-6">
                <FinanceTabBarComponent tab="monthly_reports" />
                <div className="flex h-screen flex-col items-center justify-center rounded-lg bg-white p-6">
                    <img src={coming_soon} alt="" className="h-fit" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-900">Coming Soon</h2>
                    <p className="mt-2 text-sm text-gray-600">We are working hard to bring you this feature.</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
