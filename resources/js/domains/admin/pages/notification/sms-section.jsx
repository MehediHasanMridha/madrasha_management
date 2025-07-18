import SMSContainer from '@/Container/Notification/SMSContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const SMS = ({ departments, sms_balance }) => {
    return (
        <AuthenticatedLayout>
            <Head title="SMS Notification" />
            <SMSContainer departments={departments} sms_balance={sms_balance} />
        </AuthenticatedLayout>
    );
};

export default SMS;
