import AccordionUI from '@/Components/UI/AccordionUI';
import EditScheduleModalContainer from '@/Container/Department/Exams/EditScheduleModalContainer';
import { router, usePage } from '@inertiajs/react';
import { notification } from 'antd';
import axios from 'axios';
import { ArrowBigDown, Download, Edit } from 'lucide-react';
import { useState } from 'react';

const ExamClassScheduleAndMarkContainer = ({ exam, department, classes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [examSubjects, setExamSubjects] = useState([]);
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentClassId, setCurrentClassId] = useState(null);
    const { subjects } = usePage().props;

    // Extract subjects from classes for each class
    const getSubjectsForClass = (classId) => {
        const classItem = classes.find((c) => c.class.id === classId);
        return classItem?.class?.subjects || [];
    };

    // Fetch exam subjects data when opening modal
    const handleEditScheduleClick = async (classId) => {
        setCurrentClassId(classId);
        setLoading(true);
        try {
            const response = await axios.get(route('department.get_exams_subjects', { exam_id: exam?.id }));
            console.log('🚀 ~ handleEditScheduleClick ~ response:', response);

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Filter exam subjects for the current class
                    const classExamSubjects = data.data.exam_subjects?.filter((subject) => subject.class_id === classId) || [];
                    // Filter available subjects for the current class
                    const classAvailableSubjects = data.data.available_subjects?.filter((subject) => subject.class_id === classId) || [];

                    setExamSubjects(classExamSubjects);
                    setAvailableSubjects(classAvailableSubjects);
                    setIsModalOpen(true);
                } else {
                    throw new Error(data.message || 'Failed to load exam subjects');
                }
            } else {
                throw new Error('Failed to load exam subjects');
            }
        } catch (error) {
            console.log('Error fetching exam subjects:', error);
            notification.error({
                message: 'Error',
                description: error.message || 'Failed to load exam subjects',
                placement: 'bottomRight',
            });
        } finally {
            setLoading(false);
        }
    };

    // Save exam subjects
    const handleSaveSchedule = async (scheduleData) => {
        try {
            router.post(
                route('department.exams.subjects.store', { exam_id: exam?.id }),
                {
                    subjects: scheduleData
                        .filter((subject) => subject.exam_date && subject.start_time) // Only save subjects with required data
                        .map((subject) => ({
                            subject_id: subject.subject_id,
                            class_id: subject.class_id,
                            exam_date: subject.exam_date,
                            start_time: subject.start_time,
                            end_time: subject.end_time || null,
                            total_marks: subject.total_marks,
                            pass_marks: subject.pass_marks,
                        })),
                },
                {
                    onSuccess: (data) => {
                        notification.success({
                            message: 'Success',
                            description: 'Exam schedule updated successfully',
                            placement: 'bottomRight',
                        });
                        // Refresh page to show updated data
                        router.reload();
                    },
                    onError: (errors) => {
                        throw new Error(errors.message || 'Failed to save schedule');
                    },
                },
            );
        } catch (error) {
            console.error('Error saving schedule:', error);
            notification.error({
                message: 'Error',
                description: error.message || 'Failed to save exam schedule',
                placement: 'bottomRight',
            });
            throw error;
        }
    };

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
