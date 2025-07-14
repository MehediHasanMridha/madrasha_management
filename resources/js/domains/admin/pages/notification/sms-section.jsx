import SMSContainer from '@/Container/Notification/SMSContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const SMS = ({ departments }) => {
    return (
        <AuthenticatedLayout>
            <Head title="SMS Notification" />
            <SMSContainer departments={departments} />
        </AuthenticatedLayout>
    );
};

export default SMS;
