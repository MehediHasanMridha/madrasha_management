import { usePage } from '@inertiajs/react';

const TeacherSectionContainer = () => {
    const { staff } = usePage().props;
    console.log('🚀 ~ TeacherSectionContainer ~ staff:', staff);
    return <div>TeacherSectionContainer</div>;
};

export default TeacherSectionContainer;
