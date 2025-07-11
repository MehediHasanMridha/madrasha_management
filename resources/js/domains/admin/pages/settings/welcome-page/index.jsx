import WelcomePageEditorContainer from '@/Container/SettingsContainer/WelcomePageContent/WelcomePageEditorContainer';
import SettingsLayout from '@/layouts/settings/SettingsLayout';
import { Head } from '@inertiajs/react';

export default function WelcomePage({ contents }) {
    return (
        <SettingsLayout>
            <Head title="Welcome Page Editor" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Welcome Page Editor</h1>
                        <p className="mt-1 text-sm text-gray-500">Customize your welcome page content with drag-and-drop editing</p>
                    </div>
                </div>

                <WelcomePageEditorContainer contents={contents} />
            </div>
        </SettingsLayout>
    );
}
