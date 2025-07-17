import NotificationTabBarComponent from '@/Components/Notification/NotificationTabBarComponent';
import SMSComponent from '@/Components/Notification/SMSComponent';

const SMSContainer = ({ departments, sms_balance }) => {
    return (
        <>
            <NotificationTabBarComponent tab="sms" />
            <SMSComponent departments={departments} sms_balance={sms_balance} />
        </>
    );
};

export default SMSContainer;
