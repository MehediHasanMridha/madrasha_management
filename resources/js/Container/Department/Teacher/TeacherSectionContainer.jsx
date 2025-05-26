import TeacherSectionComponent from '@/Components/Department/Teacher/TeacherSectionComponent';
import { useTeachersContext } from '@/contextApi&reducer/Department/TeacherContextApi';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

const TeacherSectionContainer = ({ department }) => {
    const [modal, setModal] = useState(false);
    const { staffs, dispatch, checkedList, checkListDispatch } = useTeachersContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        try {
            setModal(true);
            const { data } = await axios.get(route('get_assign_staff_data'), { params: { department_id: department.id, page: 1 } });
            dispatch({ type: 'added', staffs: data });
        } catch (error) {
            console.log('🚀 ~ handleClick ~ error:', error);
        }
    };

    const handleOk = async () => {
        // Handle the OK button click event here
        const { data } = await axios.post(route('assign.staff.store'), { staffs: checkedList, department_id: department.id });
        checkListDispatch({ type: 'resetCheckedList' });
        setModal(false);
        router.get(route('department.teachers_show', { department_slug: department.slug }), {}, { preserveState: true, preserveScroll: true });
    };
    const handleCancel = () => {
        // Handle the Cancel button click event here
        setModal(false);
    };

    return (
        <TeacherSectionComponent
            department={department}
            openModal={modal}
            handleOk={handleOk}
            handleCancel={handleCancel}
            handleClick={handleClick}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
        />
    );
};

export default TeacherSectionContainer;
