import TableUI from '@/Components/UI/TableUI';
import { usePage } from '@inertiajs/react';

const ExamDueListTableContainer = ({ classItem }) => {
    const { examFeeStudentsStatus } = usePage().props;
    const columns = [
        {
            title: 'Sl.No.',
            dataIndex: 'sl',
            key: 'sl',
            width: 60,
            align: 'center',
        },
        {
            title: 'Student Name',
            dataIndex: 'student_info',
            key: 'student_info',
            width: 250,
            render: (studentInfo) => (
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-300 text-xs font-medium text-white">
                        {studentInfo.avatar}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-[#4A4A4A]">{studentInfo.name}</span>
                        <span className="text-xs text-[#4A4A4A]">{studentInfo.student_id}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Father Name',
            dataIndex: 'father_name',
            key: 'father_name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => {
                if (status === 'due') {
                    return <span className="font-semibold text-black">Unpaid</span>;
                }
                if (status === 'paid') {
                    return (
                        <div className="flex w-full items-center justify-center gap-x-2">
                            <span className="w-[56px] rounded-full border-[0.5px] border-[#00A606] bg-[#E4FFE5] text-[14px] font-semibold text-[#00A606]">
                                Paid
                            </span>
                        </div>
                    );
                }
                if (status === 'Unpaid') {
                    return <span className="font-semibold text-black">Unpaid</span>;
                }
            },
        },
    ];
    const classWiseData = examFeeStudentsStatus?.filter((student) => student.class_id === classItem?.class?.id) || [];

    const dataSource = classWiseData?.map((student, index) => ({
        key: student.id,
        id: student.id,
        sl: index + 1,
        class_id: student.class_id,
        student_info: {
            name: student.name,
            student_id: student.unique_id || 'N/A',
            avatar: student.name?.charAt(0) || 'S', // Default avatar if none provided
        },
        phone_number: student.phone,
        father_name: student.father_name,
        status: student.status,
    }));

    return (
        <>
            <div className="mb-4 text-lg font-semibold text-[#131313]">Exam Due List</div>
            <TableUI data={{ data: dataSource }} columns={columns} pagination={false} />
        </>
    );
};

export default ExamDueListTableContainer;
