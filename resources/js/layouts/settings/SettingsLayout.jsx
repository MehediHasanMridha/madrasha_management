import GradientTextAnimation from '@/Components/UI/GradientTextAnimation';
import LayoutUI from '@/Components/UI/LayoutUI';
import SettingLeftSide from '@/Container/SettingsContainer/SettingLeftSide';
import { usePage } from '@inertiajs/react';

export default function SettingsLayout({ children }) {
    const { mode } = usePage().props;
    return (
        <LayoutUI>
            {({ Content }) => (
                <>
                    {mode === 'development' && (
                        <div className="text-md absolute top-0 z-50 w-full bg-red-500 py-[4px] text-center text-white">
                            <GradientTextAnimation
                                colors={['#fffffe', '#27defa', '#fffffe', '#27defa', '#fffffe']}
                                animationSpeed={3}
                                showBorder={false}
                                // className="custom-class"
                            >
                                This is Development Server
                            </GradientTextAnimation>
                        </div>
                    )}
                    <SettingLeftSide />
                    <Content className="h-screen overflow-y-auto px-[50px] pt-[24px]">{children}</Content>
                </>
            )}
        </LayoutUI>
    );
}
