import StudentSectionComponent from '@/Components/Department/Student/StudentSectionComponent';
import { StudentSectionProvider } from '@/contextApi&reducer/Department/StudentContextApi';
import { notification } from 'antd';
import { useState } from 'react';

const StudentSectionContainer = ({ department, students, districts, districtId, upazillas, setDistrictId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    return (
        <StudentSectionProvider value={{ department, students, isModalOpen, setIsModalOpen, districts, districtId, upazillas, setDistrictId, api }}>
            <StudentSectionComponent
                contextHolder={contextHolder}
                department={department}
                students={students}
                setIsLoading={setIsLoading}
                setIsModalOpen={setIsModalOpen}
            />
        </StudentSectionProvider>
    );
};

export default StudentSectionContainer;
