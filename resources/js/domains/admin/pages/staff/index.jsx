import ManageStaffContainer from '@/Container/Staff/ManageStaffContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

const StaffList = ({ staff, filters, sortOrder }) => {
    return (
        <AuthenticatedLayout>
            <ManageStaffContainer staff={staff} filters={filters} sortOrder={sortOrder} />
        </AuthenticatedLayout>
    );
};

export default StaffList;
