import FeeTypeContainer from '@/Container/SettingsContainer/FeeTypes/FeeTypeContainer';
import SettingsLayout from '@/layouts/settings/SettingsLayout';
import { Head } from '@inertiajs/react';

const FeeTypes = ({ feeTypes }) => {
    return (
        <SettingsLayout>
            <Head title="Fee Types" />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Fee Types</h1>
                <FeeTypeContainer feeTypes={feeTypes} />
            </div>
        </SettingsLayout>
    );
};

export default FeeTypes;
