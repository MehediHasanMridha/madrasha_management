import ClassContainer from '@/Container/Class/ClassContainer';
import SettingsLayout from '@/layouts/settings/layout';

const Class = ({ classes }) => {
    return (
        <SettingsLayout>
            <ClassContainer classes={classes} />
        </SettingsLayout>
    );
};

export default Class;
