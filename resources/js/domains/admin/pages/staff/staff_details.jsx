import BreadcrumbUI from '@/Components/UI/BreadcrumbUI';
import StaffDetailsContainer from '@/Container/Staff/StaffDetailsContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

const StaffDetails = ({ staff }) => {
    return (
        <AuthenticatedLayout>
            <div className="my-4">
                <BreadcrumbUI items={[{ title: <Link href={route('staff.index')}>Staff</Link> }, { title: 'Staff Details', active: true }]} />
            </div>
            <StaffDetailsContainer staff={staff} />
        </AuthenticatedLayout>
    );
};

export default StaffDetails;
