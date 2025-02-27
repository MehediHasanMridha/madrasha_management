import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="bg-gray-400 w-full text-4xl text-center py-4">
                Here is the dashboard content
            </div>
        </AuthenticatedLayout>
    );
}
