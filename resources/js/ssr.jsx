/* prettier-ignore */
import '@ant-design/v5-patch-for-react-19';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => {
            const pages = import.meta.glob('./pages/**/*.jsx', {
                eager: true,
            });
            return pages[`./pages/${name}.jsx`];
        },
        // prettier-ignore
        setup: ({ App, props }) => <App {...props} />,
    }),
);
