import AccordionUI from '@/Components/UI/AccordionUI';
import EditScheduleModalContainer from '@/Container/Department/Exams/EditScheduleModalContainer';
import { usePage } from '@inertiajs/react';
import { ArrowBigDown, Download, Edit } from 'lucide-react';
import { useState } from 'react';

const ExamClassScheduleAndMarkContainer = ({ exam, department, classes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [examSubjects, setExamSubjects] = useState([]);
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentClassId, setCurrentClassId] = useState(null);
    const { subjects } = usePage().props;

    // Get exam subjects for a specific class
    const getExamSubjectsForClass = (classId) => {
        if (!subjects) return [];
        return subjects.filter((subject) => subject.class_id === classId);
    };

    const accordionItems =
        classes?.map((classItem, index) => ({
            key: `${index + 1}`,
            label: (
                <div className="flex w-full items-center justify-between">
                    <span className="text-lg font-medium text-[#131313]">{classItem.class.name}</span>
                </div>
            ),
            children: (
                <div className="space-y-8">
                    {/* Schedule Section */}
                    <div className="space-y-2">
                        <div className="mb-2 flex items-center justify-center gap-2.5">
                            <span className="flex-1 text-sm text-[#4A4A4A]">Schedule</span>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 rounded border-0 bg-transparent px-3 py-2 text-sm text-[#0267FF] transition-colors hover:bg-blue-50">
                                    <Download size={16} />
                                    Download Schedule
                                </button>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(true);
                                        setCurrentClassId(classItem.class.id);
                                    }}
                                    disabled={loading}
                                    className="flex items-center gap-2 rounded border-0 bg-transparent px-3 py-2 text-sm text-[#0267FF] transition-colors hover:bg-blue-50 disabled:opacity-50"
                                >
                                    <Edit size={16} />
                                    {loading ? 'Loading...' : 'Edit Schedule'}
                                </button>
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

                            {/* Table Rows */}
                            {(() => {
                                const classExamSubjects = getExamSubjectsForClass(classItem.class.id);

                                if (classExamSubjects.length === 0) {
                                    return (
                                        <div className="p-6 text-center text-[#AFAFAF]">
                                            No exam schedule available. Click "Edit Schedule" to add subjects.
                                        </div>
                                    );
                                }

                                return classExamSubjects?.map((examSubject, subIndex) => (
                                    <div key={subIndex} className={`grid grid-cols-4 gap-4 p-3 ${subIndex % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]'}`}>
                                        <div className="text-base text-[#4A4A4A]">{examSubject?.name || 'N/A'}</div>
                                        <div className={`text-base ${!examSubject.exam_date ? 'text-[#AFAFAF]' : 'text-[#4A4A4A]'}`}>
                                            {examSubject?.exam_subjects?.length > 0
                                                ? new Date(examSubject?.exam_subjects[0]?.exam_date).toLocaleDateString('en-US', {
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric',
                                                      weekday: 'long',
                                                  })
                                                : 'dd/mm/yyyy - Day'}
                                        </div>
                                        <div className="text-base text-[#4A4A4A]">{examSubject?.exam_subjects[0]?.total_marks || 0}</div>
                                        <div className="text-base text-[#4A4A4A]">{examSubject?.exam_subjects[0]?.pass_marks || 0}</div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                </div>
            ),
        })) || [];

    return (
        <>
            <div className="mt-6 bg-white">
                <AccordionUI
                    items={accordionItems}
                    expandIconPosition="end"
                    expandIcon={({ isActive }) => (isActive ? <ArrowBigDown className="rotate-180" /> : <ArrowBigDown />)}
                    className="overflow-hidden rounded-lg border border-[#AFAFAF] bg-white"
                    bordered={false}
                />
            </div>

            {/* Edit Schedule Modal */}
            <EditScheduleModalContainer
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setCurrentClassId(null);
                }}
                examData={exam}
                classId={currentClassId}
                subjects={subjects}
            />
        </>
    );
};

export default ExamClassScheduleAndMarkContainer;
