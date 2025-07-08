import BrandingContainer from '@/Container/SettingsContainer/Branding/BrandingContainer';
import SettingsLayout from '@/layouts/settings/SettingsLayout';

const Branding = ({ settings = {} }) => {
    return (
        <SettingsLayout>
            <BrandingContainer settings={settings} />
        </SettingsLayout>
    );
};

export default Branding;
