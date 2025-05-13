import '@ant-design/v5-patch-for-react-19';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import GradientTextAnimation from './Components/UI/GradientTextAnimation';

const appName = import.meta.env.VITE_APP_NAME || 'Madrasatul-Hera';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <div className="fixed z-50 w-full bg-red-500 text-center text-xl text-white">
                    <GradientTextAnimation
                        colors={['#fffffe', '#27defa', '#fffffe', '#27defa', '#fffffe']}
                        animationSpeed={3}
                        showBorder={false}
                        // className="custom-class"
                    >
                        This is Development Server
                    </GradientTextAnimation>
                </div>
                <App {...props} />
            </>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
// initializeTheme();
