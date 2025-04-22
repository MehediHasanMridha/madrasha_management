import SettingDropdownComponent from '@/Components/Shared/SettingDropdownComponent';
import { Link } from '@inertiajs/react';
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5';

const items = [
    {
        label: (
            <Link href={route('settings')} className="text-xl">
                Settings
            </Link>
        ),
        key: '1',
        icon: (
            <span>
                <IoSettingsOutline className="text-xl" />
            </span>
        ),
    },
    {
        label: (
            <Link href={route('logout')} method="post" className="text-xl text-red-400">
                Logout
            </Link>
        ),
        key: '2',
        icon: (
            <span>
                <IoLogOutOutline className="text-xl" />
            </span>
        ),
    },
];
const SettingDropdownContainer = () => {
    return <SettingDropdownComponent items={items} />;
};

export default SettingDropdownContainer;
