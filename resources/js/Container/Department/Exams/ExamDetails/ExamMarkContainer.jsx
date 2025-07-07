import StaticBtn from '@/Components/UI/StaticBtn';
import { usePage } from '@inertiajs/react';
import { Download, Edit, Upload } from 'lucide-react';
import { useState } from 'react';
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
    const classSubjects = getSubjectsForClass(classItem.class.id);

    let content = null;
    if (classStudents.length === 0) {
        content = <div className="p-6 text-center text-[#AFAFAF]">No students available for this class.</div>;
    }

    if (classStudents.length > 0) {
        const totalColumns = classSubjects.length + 4; // Roll + Name + Subjects + Average + Total
        content = classStudents.map((student, studentIndex) => (
            <div
                key={studentIndex}
                className={`grid items-center gap-4 p-3 ${studentIndex % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]'}`}
                style={{ gridTemplateColumns: `60px 250px ${'1fr '.repeat(classSubjects.length)}100px 100px` }}
            >
                <div className="text-sm text-[#4A4A4A]">{student.roll || studentIndex + 1}</div>
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xs font-medium text-white">
                        {student.name?.charAt(0) || 'S'}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-[#4A4A4A]">{student.name || 'Unknown Student'}</span>
                        <span className="text-xs text-[#4A4A4A]">{student.id}</span>
                    </div>
                </div>
                {classSubjects.map((subject, subjectIndex) => (
                    <div key={subjectIndex} className="text-sm text-[#4A4A4A]">
                        {student.exam_marks?.find((mark) => mark.subject_id === subject.id && mark.exam_id === exam.id)?.marks_obtained || '--'}
                    </div>
                ))}
                <div className="text-sm text-[#4A4A4A]">
                    {(() => {
                        const marks = student.exam_marks?.filter((mark) => mark.exam_id === exam.id);
                        if (!marks || marks.length === 0) return '--';
                        const total = marks.reduce((sum, mark) => sum + (mark.marks_obtained || 0), 0);
                        return (total / marks.length).toFixed(1);
                    })()}
                </div>
                <div className="text-sm text-[#4A4A4A]">
                    {student.exam_marks?.filter((mark) => mark.exam_id === exam.id).reduce((total, mark) => total + (mark.marks_obtained || 0), 0) ||
                        '--'}
                </div>
            </div>
        ));
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

                {/* Mark Sheet Table */}
                <div className="overflow-x-auto rounded border-[0.5px] border-[#AFAFAF]">
                    {/* Table Header */}
                    <div
                        className="grid min-w-[1200px] gap-4 border-b-[0.5px] border-[#AFAFAF] bg-[#F2F2F2] p-3"
                        style={{ gridTemplateColumns: `60px 250px ${'1fr '.repeat(classSubjects.length)}100px 100px` }}
                    >
                        <div className="text-sm font-medium text-[#131313]">Roll</div>
                        <div className="text-sm font-medium text-[#131313]">Student name</div>
                        {classSubjects.map((subject, index) => (
                            <div key={index} className="text-sm font-medium text-[#131313]">
                                {subject.name}
                            </div>
                        ))}
                        <div className="text-sm font-medium text-[#131313]">Average</div>
                        <div className="text-sm font-medium text-[#131313]">Total</div>
                    </div>
                    <div className="min-w-[1200px]">{content}</div>
                </div>
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
