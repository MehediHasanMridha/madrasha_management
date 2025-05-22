import FeeContainer from '@/Container/SettingsContainer/Fee/FeeContainer';
import SettingsLayout from '@/layouts/settings/SettingsLayout';
import { Head } from '@inertiajs/react';

const index = () => {
    return (
        <SettingsLayout>
            <Head title="Fee" />
            <FeeContainer />
        </SettingsLayout>
    );
};

export default index;
