import TabBarContainer from '@/Container/Finance/TabBarContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Outgoings() {
    const [activeTab, setActiveTab] = useState('outgoings');
    return (
        <AuthenticatedLayout>
            <Head title="Finance Outgoings" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <TabBarContainer activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <p className="text-gray-600">Outgoings management page is under development.</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
