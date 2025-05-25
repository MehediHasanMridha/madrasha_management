import DepartmentViewContainer from '@/Container/Department/DepartmentViewContainer';
import SettingsLayout from '@/layouts/settings/SettingsLayout';

const DepartmentView = ({ departments }) => {
    return (
        <SettingsLayout>
            <DepartmentViewContainer departments={departments} />
        </SettingsLayout>
    );
};

export default DepartmentView;
