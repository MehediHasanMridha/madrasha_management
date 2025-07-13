import SMSContainer from '@/Container/Notification/SMSContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const SMS = () => {
    return (
        <AuthenticatedLayout>
            <Head title="SMS Notification" />
            <SMSContainer />
        </AuthenticatedLayout>
    );
};

export default SMS;
