import TeacherSectionComponent from '@/Components/Department/Teacher/TeacherSectionComponent';
import { useTeachersContext } from '@/contextApi&reducer/Department/TeacherContextApi';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

const TeacherSectionContainer = ({ department }) => {
    const [modal, setModal] = useState(false);
    const { staffs, dispatch, checkedList, checkListDispatch } = useTeachersContext();

    const handleClick = async () => {
        try {
            setModal(true);
            const { data } = await axios.get('/assign-teacher?page=1', { params: { department_id: department.id } });
            dispatch({ type: 'added', staffs: data?.users });
        } catch (error) {
            console.log('🚀 ~ handleClick ~ error:', error);
        }
    };

    const handleOk = async () => {
        // Handle the OK button click event here
        const { data } = await axios.post(route('assign.staff.store'), { staffs: checkedList, department_id: department.id });
        console.log('🚀 ~ handleOk ~ data:', data);
        checkListDispatch({ type: 'resetCheckedList' });
        setModal(false);
        // then url hit
        router.visit(window.location.href);
    };
    const handleCancel = () => {
        // Handle the Cancel button click event here
        setModal(false);
    };

    return <TeacherSectionComponent openModal={modal} handleOk={handleOk} handleCancel={handleCancel} handleClick={handleClick} />;
};

export default TeacherSectionContainer;
