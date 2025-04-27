import StudentSectionComponent from '@/Components/Department/Student/StudentSectionComponent';
import { StudentSectionProvider } from '@/contextApi&reducer/Department/StudentContextApi';
import { useDistricts } from '@/hooks/api/useDistricts';
import { useUpazillas } from '@/hooks/api/useUpazilla';
import { usePage } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';

const StudentSectionContainer = ({ department }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { students } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { data: districts } = useDistricts();
    const [districtId, setDistrictId] = useState(null);
    const { data: upazillas } = useUpazillas(districtId);

    return (
        <StudentSectionProvider value={{ department, students, isModalOpen, setIsModalOpen, districts, districtId, upazillas, setDistrictId, api }}>
            <StudentSectionComponent
                contextHolder={contextHolder}
                department={department}
                students={students}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                setIsModalOpen={setIsModalOpen}
            />
        </StudentSectionProvider>
    );
};

export default StudentSectionContainer;
