import StaticBtn from '@/Components/UI/StaticBtn';
import { usePage } from '@inertiajs/react';
import { Download, Edit } from 'lucide-react';
import { useState } from 'react';
import EditScheduleModalContainer from './EditScheduleModalContainer';

const ExamScheduleContainer = ({ classItem, exam }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { subjects } = usePage().props;
    const getExamSubjectsForClass = (classId) => {
        if (!subjects) return [];
        return subjects.filter((subject) => subject.class_id === classId);
    };
    const classExamSubjects = getExamSubjectsForClass(classItem.class.id);
    let content = null;
    if (classExamSubjects.length === 0) {
        content = <div className="p-6 text-center text-[#AFAFAF]">No exam schedule available. Click "Edit Schedule" to add subjects.</div>;
    }

    if (classExamSubjects.length > 0) {
        content = classExamSubjects.map((examSubject, subIndex) => (
            <div key={subIndex} className={`grid grid-cols-4 gap-4 p-3 ${subIndex % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]'}`}>
                <div className="text-base text-[#4A4A4A]">{examSubject?.name || 'N/A'}</div>
                <div className={`text-base ${!examSubject.exam_date ? 'text-[#AFAFAF]' : 'text-[#4A4A4A]'}`}>
                    {examSubject?.exam_subjects?.length > 0 && examSubject?.exam_subjects[0]?.exam_id === exam.id
                        ? new Date(examSubject?.exam_subjects[0]?.exam_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              weekday: 'long',
                          })
                        : 'dd/mm/yyyy - Day'}
                </div>
                <div className="text-base text-[#4A4A4A]">
                    {(examSubject?.exam_subjects?.length > 0 &&
                        examSubject?.exam_subjects[0]?.exam_id == exam.id &&
                        examSubject?.exam_subjects[0]?.total_marks) ||
                        0}
                </div>
                <div className="text-base text-[#4A4A4A]">
                    {(examSubject?.exam_subjects?.length > 0 &&
                        examSubject?.exam_subjects[0]?.exam_id == exam.id &&
                        examSubject?.exam_subjects[0]?.pass_marks) ||
                        0}
                </div>
            </div>
        ));
    }

    return (
        <>
            <div className="space-y-2">
                <div className="mb-2 flex items-center justify-center gap-2.5">
                    <span className="flex-1 text-sm text-[#4A4A4A]">Schedule</span>
                    <div className="flex gap-2">
                        <StaticBtn className="flex w-fit items-center gap-2 rounded border-0 bg-transparent px-3 py-2 text-sm text-[#0267FF] transition-colors hover:bg-blue-50">
                            <Download size={16} />
                            Download Schedule
                        </StaticBtn>
                        <StaticBtn
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                            className="flex items-center gap-2 rounded border-0 bg-transparent px-3 py-2 text-sm text-[#0267FF] transition-colors hover:bg-blue-50 disabled:opacity-50"
                        >
                            <Edit size={16} />
                            Edit Schedule
                        </StaticBtn>
                    </div>
                </div>

                {/* Schedule Table */}
                <div className="rounded border-[0.5px] border-[#AFAFAF]">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 gap-4 border-b-[0.5px] border-[#AFAFAF] bg-[#F2F2F2] p-3">
                        <div className="text-base font-medium text-[#131313]">Subjects</div>
                        <div className="text-base font-medium text-[#131313]">Exam date</div>
                        <div className="text-base font-medium text-[#131313]">Full marks</div>
                        <div className="text-base font-medium text-[#131313]">Pass marks</div>
                    </div>
                    {content}
                </div>
            </div>
            {/* Edit Schedule Modal */}
            <EditScheduleModalContainer
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
                examData={exam}
                classId={classItem.class.id}
                subjects={subjects}
            />
        </>
    );
};

export default ExamScheduleContainer;
