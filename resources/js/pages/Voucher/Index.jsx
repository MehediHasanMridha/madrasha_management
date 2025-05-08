import VoucherTypeContainer from '@/Container/SettingsContainer/VoucherTypes/VoucherTypeContainer';
import SettingsLayout from '@/layouts/settings/SettingsLayout';
import { Head } from '@inertiajs/react';

const VoucherType = ({ voucherTypes }) => {
    return (
        <SettingsLayout>
            <Head title="Voucher Types" />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Voucher Types</h1>
                <VoucherTypeContainer voucherTypes={voucherTypes} />
            </div>
        </SettingsLayout>
    );
};

export default VoucherType;
