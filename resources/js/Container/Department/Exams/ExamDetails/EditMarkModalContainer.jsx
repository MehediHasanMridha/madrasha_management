import Field from '@/Components/UI/Field';
import ModalUI from '@/Components/UI/ModalUI';
import StaticBtn from '@/Components/UI/StaticBtn';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const EditMarkModalContainer = ({ isOpen, onClose, examData, classItem, students, subjects }) => {
    // Prepare initial form data
    const initialFormData = useMemo(
        () => ({
            students:
                students?.map((student) => ({
                    student_id: student.id,
                    student_name: student.name,
                    student_roll: student.roll || students.indexOf(student) + 1,
                    class_id: classItem.class.id,
                    subjects:
                        subjects?.map((subject) => ({
                            subject_id: subject.id,
                            marks_obtained:
                                student.exam_marks?.find((mark) => mark.subject_id === subject.id && mark.exam_id === examData.id)?.marks_obtained ||
                                '',
                            total_marks: subject.exam_subjects?.[0]?.total_marks || 100,
                            pass_marks: subject.exam_subjects?.[0]?.pass_marks || 40,
                            status:
                                student.exam_marks?.find((mark) => mark.subject_id === subject.id && mark.exam_id === examData.id)?.status ||
                                'present',
                        })) || [],
                })) || [],
        }),
        [students, subjects, classItem, examData],
    );

    // React Hook Form setup
    const {
        control,
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: initialFormData,
        mode: 'onChange',
    });

    // Use field array for dynamic form handling
    const { fields } = useFieldArray({
        control,
        name: 'students',
    });

    // Watch all form values for validation
    const watchedValues = watch();

    // Reset form when modal opens/closes or data changes
    useEffect(() => {
        if (isOpen && students.length > 0) {
            reset(initialFormData);
        } else if (!isOpen) {
            reset();
        }
    }, [isOpen, students, reset, initialFormData]);

    // Form validation rules
    const validationRules = {
        marks_obtained: {
            validate: (value, formValues, studentIndex, subjectIndex) => {
                if (!value) return true; // Allow empty values
                const totalMarks = watchedValues.students?.[studentIndex]?.subjects?.[subjectIndex]?.total_marks;
                if (totalMarks && Number(value) > Number(totalMarks)) {
                    return 'Marks cannot exceed total marks';
                }
                if (Number(value) < 0) {
                    return 'Marks cannot be negative';
                }
                return true;
            },
        },
    };

    // Form submission handler
    const onSubmit = (formData) => {
        // Transform data to the expected format
        const marksData = [];

        formData.students.forEach((student) => {
            student.subjects.forEach((subject) => {
                if (subject.marks_obtained !== '') {
                    marksData.push({
                        student_id: student.student_id,
                        subject_id: subject.subject_id,
                        class_id: student.class_id,
                        marks_obtained: Number(subject.marks_obtained),
                        total_marks: Number(subject.total_marks),
                        pass_marks: Number(subject.pass_marks),
                        status: subject.status,
                        remarks: subject.remarks || '',
                    });
                }
            });
        });

        router.post(
            route('department.exams.marks.store', { exam_id: examData?.id }),
            { marks: marksData },
            {
                onSuccess: () => {
                    notification.success({
                        message: 'Success',
                        description: 'Marks updated successfully',
                        placement: 'bottomRight',
                    });
                    onClose();
                },
                onError: (errors) => {
                    notification.error({
                        message: 'Error',
                        description: errors.message || 'Failed to save marks',
                        placement: 'bottomRight',
                    });
                },
            },
        );
    };

    // Handle modal close
    const handleCancel = () => {
        reset();
        onClose();
    };

    // Render helpers
    const renderEmptyState = () => (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 text-6xl text-[#AFAFAF]">📝</div>
            <h3 className="mb-2 text-lg font-medium text-[#131313]">No Students Available</h3>
            <p className="text-sm text-[#4A4A4A]">There are no students available for this class to add marks.</p>
        </div>
    );

    const renderFormField = (studentIndex, subjectIndex, fieldName, inputProps = {}) => {
        const error = errors?.students?.[studentIndex]?.subjects?.[subjectIndex]?.[fieldName];
        const fieldRegister = register(`students.${studentIndex}.subjects.${subjectIndex}.${fieldName}`, validationRules[fieldName]);

        return (
            <Field className="relative" error={error}>
                <input
                    {...fieldRegister}
                    {...inputProps}
                    className={cn(
                        'w-full rounded border p-2 text-sm focus:outline-none',
                        error ? 'border-red-500 focus:border-red-500' : 'border-[#AFAFAF] focus:border-[#0267FF]',
                    )}
                />
            </Field>
        );
    };

    const renderMarksTable = () => (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="rounded border-[0.5px] border-[#AFAFAF]">
                <div className="overflow-x-auto">
                    <div className="grid min-w-[1000px] gap-0" style={{ gridTemplateColumns: `60px 200px ${'1fr '.repeat(subjects.length)}` }}>
                        {/* Header Row */}
                        <div className="border-b-[0.5px] border-[#AFAFAF] bg-[#F2F2F2] p-3">
                            <span className="text-sm font-medium text-[#131313]">Roll</span>
                        </div>
                        <div className="border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] bg-[#F2F2F2] p-3">
                            <span className="text-sm font-medium text-[#131313]">Student</span>
                        </div>
                        {subjects.map((subject, index) => (
                            <div key={index} className="border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] bg-[#F2F2F2] p-3">
                                <div className="text-sm font-medium text-[#131313]">{subject.name}</div>
                                <div className="mt-1 text-xs text-[#4A4A4A]">/{subject.exam_subjects?.[0]?.total_marks || 100}</div>
                            </div>
                        ))}

                        {/* Student Rows */}
                        {fields.map((student, studentIndex) => (
                            <React.Fragment key={student.id}>
                                {/* Roll */}
                                <div
                                    className={cn(
                                        'flex items-center border-b-[0.5px] border-[#AFAFAF] p-3',
                                        studentIndex % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]',
                                    )}
                                >
                                    <span className="text-sm text-[#4A4A4A]">{student.student_roll}</span>
                                </div>

                                {/* Student Name */}
                                <div
                                    className={cn(
                                        'flex items-center border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] p-3',
                                        studentIndex % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]',
                                    )}
                                >
                                    <span className="text-sm text-[#4A4A4A]">{student.student_name}</span>
                                </div>

                                {/* Subject Marks */}
                                {subjects.map((subject, subjectIndex) => (
                                    <div
                                        key={subjectIndex}
                                        className={cn(
                                            'border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] p-2',
                                            studentIndex % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]',
                                        )}
                                    >
                                        {renderFormField(studentIndex, subjectIndex, 'marks_obtained', {
                                            type: 'number',
                                            min: 0,
                                            max: subject.exam_subjects?.[0]?.total_marks || 100,
                                            step: 0.01,
                                            placeholder: '0',
                                        })}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
                <StaticBtn onClick={handleCancel} className="rounded bg-[#F2F2F2] px-6 py-3 text-[#4A4A4A] hover:bg-gray-300" disabled={isSubmitting}>
                    Cancel
                </StaticBtn>
                <SubmitBtn
                    loadingIndicator={isSubmitting}
                    btnText="Save Marks"
                    className="cursor-pointer bg-blue-400 px-6 py-3 text-white hover:bg-blue-500 disabled:opacity-50"
                    type="submit"
                    disabled={isSubmitting || fields.length === 0}
                />
            </div>
        </form>
    );

    // Main render
    return (
        <ModalUI
            isModalOpen={isOpen}
            handleCancel={handleCancel}
            width="90%"
            title={<h1 className="border-b border-[#AFAFAF] pb-3 text-[20px] font-semibold text-[#111827]">Edit Marks</h1>}
            footer={null}
        >
            <div className="space-y-6 p-6">{fields.length === 0 ? renderEmptyState() : renderMarksTable()}</div>
        </ModalUI>
    );
};

export default EditMarkModalContainer;
