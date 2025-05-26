import FeeContainer from '@/Container/SettingsContainer/Fee/FeeContainer';
import SettingsLayout from '@/layouts/settings/SettingsLayout';
import { Head } from '@inertiajs/react';

const index = ({ fee }) => {
    return (
        <SettingsLayout>
            <Head title="Fee" />
            <FeeContainer fee={fee} />
        </SettingsLayout>
    );
};

export default index;
