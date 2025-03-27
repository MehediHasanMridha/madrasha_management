import { Link } from '@inertiajs/react';

const SettingDashboardComponent = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-y-4 text-4xl">
            <Link href={route('department')}>Add Campus</Link>
            <Link href={route('class')}>Add class</Link>
        </div>
    );
};

export default SettingDashboardComponent;
