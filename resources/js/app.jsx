import '@ant-design/v5-patch-for-react-19';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'Miftahul Quran';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // Split the name into domain and page (e.g., "admin::dashboard" -> ["admin", "dashboard"])
        const [domain, page] = name.split('::');

        // If no domain is specified (e.g., "welcome"), use "main" as default domain
        const resolvedName = page ? `./domains/${domain}/pages/${page}.jsx` : `./domains/main/pages/${domain}.jsx`;

        return resolvePageComponent(resolvedName, import.meta.glob('./domains/**/pages/**/*.jsx', { eager: false }));
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
// initializeTheme();
