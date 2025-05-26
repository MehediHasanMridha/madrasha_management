import ClassContainer from '@/Container/Department/Class/ClassContainer';
import SettingsLayout from '@/layouts/settings/SettingsLayout';

const Classes = ({ classes, department }) => {
    return (
        <SettingsLayout>
            <ClassContainer classes={classes} department={department} />
        </SettingsLayout>
    );
};

export default Classes;
