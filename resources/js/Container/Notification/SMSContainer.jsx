import NotificationTabBarComponent from '@/Components/Notification/NotificationTabBarComponent';
import SMSComponent from '@/Components/Notification/SMSComponent';

const SMSContainer = ({ departments }) => {
    return (
        <>
            <NotificationTabBarComponent tab="sms" />
            <SMSComponent departments={departments} />
        </>
    );
};

export default SMSContainer;
