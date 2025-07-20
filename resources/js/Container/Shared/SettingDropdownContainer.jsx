import { CreditCardIcon, EditIcon } from '@/Components/Icon';
import SettingDropdownComponent from '@/Components/Shared/SettingDropdownComponent';
import TagUI from '@/Components/UI/TagUI';
import { Link, usePage } from '@inertiajs/react';
import { Book, Joystick, MessageSquareWarning, Settings, ShieldAlert, TriangleAlert } from 'lucide-react';

const items = [
    {
        label: <Link href={route('profile.edit')}>Edit profile</Link>,
        key: '1',
        icon: <EditIcon />,
    },
    {
        label: (
            <span className="flex items-center justify-between">
                <span>Bills & Payments</span> <TagUI>Upcoming</TagUI>
            </span>
        ),
        key: '2',
        icon: <CreditCardIcon />,
    },
    {
        label: (
            <span className="flex items-center justify-between">
                <span>Tutorials</span> <TagUI>Upcoming</TagUI>
            </span>
        ),
        key: '3',
        icon: <Book strokeWidth={1.5} className="text-[#4A4A4A]" />,
    },
    {
        label: (
            <a href="https://dev.madrasatulhera.com" target="_blank" className="flex items-center justify-between">
                <span>Practice Mode</span>
            </a>
        ),
        key: '4',
        icon: <Joystick strokeWidth={1.5} className="text-[#4A4A4A]" />,
    },
    {
        label: <Link href={route('settings')}>Settings</Link>,
        key: '5',
        icon: <Settings className="text-[#4A4A4A]" strokeWidth={1.5} />,
    },
    {
        type: 'divider',
    },
    {
        label: (
            <span className="flex items-center justify-between">
                <span>Report a problem</span> <TagUI>Upcoming</TagUI>
            </span>
        ),
        key: '6',
        icon: <MessageSquareWarning strokeWidth={1.5} className="text-[#4A4A4A]" />,
    },
    {
        label: (
            <span className="flex items-center justify-between">
                <span>Terms & conditions</span> <TagUI>Upcoming</TagUI>
            </span>
        ),
        key: '7',
        icon: <TriangleAlert strokeWidth={1.5} className="text-[#4A4A4A]" />,
    },
    {
        label: (
            <span className="flex items-center justify-between">
                <span>Privacy policy</span> <TagUI>Upcoming</TagUI>
            </span>
        ),
        key: '8',
        icon: <ShieldAlert strokeWidth={1.5} className="text-[#4A4A4A]" />,
    },
];
const SettingDropdownContainer = () => {
    const { user } = usePage().props.auth;
    return <SettingDropdownComponent items={items} user={user} />;
};

export default SettingDropdownContainer;
