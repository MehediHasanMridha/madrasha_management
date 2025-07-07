import StaticBtn from '@/Components/UI/StaticBtn';
import TableUI from '@/Components/UI/TableUI';
import { usePage } from '@inertiajs/react';
import { Download, Edit, Upload } from 'lucide-react';
import { useMemo, useState } from 'react';
import EditMarkModalContainer from './EditMarkModalContainer';

const ExamMarkContainer = ({ classItem, exam }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { students, subjects } = usePage().props;

    const getStudentsForClass = (classId) => {
        if (!students) return [];
        return students.filter((student) => student.class_id === classId);
    };

    const getSubjectsForClass = (classId) => {
        if (!subjects) return [];
        return subjects.filter((subject) => subject.class_id === classId);
    };

    const classStudents = getStudentsForClass(classItem.class.id);
    console.log('🚀 ~ ExamMarkContainer ~ classStudents:', classStudents);
    const classSubjects = getSubjectsForClass(classItem.class.id);

    // Prepare columns for TableUI
    const tableColumns = useMemo(() => {
        const columns = [
            {
                title: 'Sl. No.',
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
            // Dynamic subject columns
            ...classSubjects.map((subject) => ({
                title: subject.name,
                dataIndex: `subject_${subject.id}`,
                key: `subject_${subject.id}`,
                align: 'center',
                render: ({ marks_obtained, grade }) => (
                    <span className="text-sm text-[#4A4A4A]">
                        {marks_obtained}
                        {grade ? ` - (${grade})` : '--'}
                    </span>
                ),
            })),
            {
                title: 'Average',
                dataIndex: 'average',
                key: 'average',
                width: 100,
                align: 'center',
                render: (average) => <span className="text-sm text-[#4A4A4A]">{average}</span>,
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                width: 100,
                align: 'center',
                render: (total) => <span className="text-sm text-[#4A4A4A]">{total}</span>,
            },
        ];

        return columns;
    }, [classSubjects]);

    // Prepare data for TableUI
    const tableData = useMemo(() => {
        if (!classStudents || classStudents.length === 0) return { data: [] };

        return {
            data: classStudents.map((student, index) => ({
                key: student.id,
                id: student.id,
                sl: index + 1,
                student_info: {
                    name: student.name || 'Unknown Student',
                    student_id: student.unique_id || 'N/A',
                    avatar: student.name?.charAt(0) || 'S',
                },
                ...classSubjects.reduce((acc, subject) => {
                    const mark = student.exam_marks?.find((mark) => mark.subject_id === subject.id && mark.exam_id === exam.id);
                    acc[`subject_${subject.id}`] = { marks_obtained: mark?.marks_obtained, grade: mark?.grade } || '--';
                    return acc;
                }, {}),
                average: (() => {
                    const marks = student.exam_marks?.filter((mark) => mark.exam_id === exam.id);
                    if (!marks || marks.length === 0) return '--';
                    const total = marks.reduce((sum, mark) => sum + (Number(mark.marks_obtained) || 0), 0);
                    return (total / marks.length).toFixed(1);
                })(),
                total:
                    student.exam_marks
                        ?.filter((mark) => mark.exam_id === exam.id)
                        .reduce((total, mark) => total + (Number(mark.marks_obtained) || 0), 0) || '--',
            })),
        };
    }, [classStudents, classSubjects, exam.id]);

    let content = null;
    if (classStudents.length === 0) {
        content = <div className="p-6 text-center text-[#AFAFAF]">No students available for this class.</div>;
    }

    if (classStudents.length > 0) {
        content = (
            <TableUI data={tableData} columns={tableColumns} showLoading={false} pagination={false} size="small" scroll={{ x: 'max-content' }} />
        );
    }

    return (
        <>
            <div className="space-y-2">
                <div className="mb-2 flex items-center justify-center gap-2.5">
                    <span className="flex-1 text-sm text-[#4A4A4A]">Mark sheet</span>
                    <div className="flex gap-2">
                        <StaticBtn className="flex w-fit items-center gap-2 rounded border-0 bg-transparent px-3 py-2 text-sm text-[#0267FF] transition-colors hover:bg-blue-50">
                            <Download size={16} />
                            Download Template
                        </StaticBtn>
                        <StaticBtn className="flex items-center gap-2 rounded border-0 bg-transparent px-3 py-2 text-sm text-[#0267FF] transition-colors hover:bg-blue-50">
                            <Upload size={16} />
                            Upload data
                        </StaticBtn>
                        <StaticBtn
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                            className="flex items-center gap-2 rounded border-0 bg-transparent px-3 py-2 text-sm text-[#0267FF] transition-colors hover:bg-blue-50 disabled:opacity-50"
                        >
                            <Edit size={16} />
                            Edit Marks
                        </StaticBtn>
                    </div>
                </div>
                {content}
            </div>

            {/* Edit Mark Modal */}
            <EditMarkModalContainer
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
                examData={exam}
                classItem={classItem}
                students={classStudents}
                subjects={classSubjects}
            />
        </>
    );
};

export default ExamMarkContainer;
