import NotificationTabBarComponent from '@/Components/Notification/NotificationTabBarComponent';
import SMSComponent from '@/Components/Notification/SMSComponent';

const SMSContainer = () => {
    return (
        <>
            <NotificationTabBarComponent tab="sms" />
            <SMSComponent />
        </>
    );
};

export default SMSContainer;
