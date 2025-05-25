import FeeCategoryContainer from '@/Container/SettingsContainer/Fee/FeeCategory/FeeCategoryContainer';
import SettingsLayout from '@/layouts/settings/SettingsLayout';
import { Head } from '@inertiajs/react';

const index = ({ fee }) => {
    return (
        <SettingsLayout>
            <Head title="Fee" />
            <FeeCategoryContainer fee={fee} />
        </SettingsLayout>
    );
};

export default index;
