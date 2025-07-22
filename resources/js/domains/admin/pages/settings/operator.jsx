import OperatorContainer from '@/Container/SettingsContainer/Operator/OperatorContainer';
import SettingsLayout from '@/layouts/settings/SettingsLayout';

const operator = ({ operators }) => {
    return (
        <SettingsLayout>
            <OperatorContainer operators={operators} />
        </SettingsLayout>
    );
};

export default operator;
