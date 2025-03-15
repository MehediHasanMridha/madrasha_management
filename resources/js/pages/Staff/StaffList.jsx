import StaffListContainer from '@/Container/Staff/StaffListContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

const StaffList = ({ staff, filters, sortOrder }) => {
    return (
        <AuthenticatedLayout>
            <StaffListContainer staff={staff} filters={filters} sortOrder={sortOrder} />
        </AuthenticatedLayout>
    );
};

export default StaffList;
