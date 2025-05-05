import LayoutUI from '@/Components/UI/LayoutUI';
import SettingLeftSide from '@/Container/Settings/SettingLeftSide';

export default function SettingsLayout({ children }) {
    return (
        <LayoutUI>
            {() => (
                <>
                    <SettingLeftSide />
                    <LayoutUI>{({ Content }) => <Content className="h-screen overflow-y-auto px-[50px] pt-[24px]">{children}</Content>}</LayoutUI>
                </>
            )}
        </LayoutUI>
    );
}
