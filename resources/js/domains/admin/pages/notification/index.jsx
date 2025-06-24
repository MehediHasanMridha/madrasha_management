import NotificationContainer from '@/Container/Notification/NotificationContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Notification = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Send Notification" />
            <NotificationContainer />
        </AuthenticatedLayout>
    );
};

export default Notification;
