import GradientTextAnimation from '@/Components/UI/GradientTextAnimation';
import LayoutUI from '@/Components/UI/LayoutUI';
import LeftSide from '@/Container/LeftSide/LeftSide';
import { usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const { mode } = usePage().props;
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

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

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <button
                            onClick={handleDrawerOpen}
                            className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg"
                            aria-label="Open menu"
                        >
                            <Menu size={20} className="text-gray-600" />
                        </button>
                    )}

                    <LeftSide isMobile={isMobile} drawerOpen={drawerOpen} onDrawerClose={handleDrawerClose} />
                    <Content className={`h-screen overflow-y-auto ${isMobile ? 'px-4 pt-16' : 'px-[50px] pt-[24px]'}`}>{children}</Content>
                </>
            )}
        </LayoutUI>
    );
}
