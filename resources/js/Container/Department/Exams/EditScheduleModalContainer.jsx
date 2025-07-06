import { router } from '@inertiajs/react';
import { notification } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import Field from '@/Components/UI/Field';
import ModalUI from '@/Components/UI/ModalUI';
import StaticBtn from '@/Components/UI/StaticBtn';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { cn } from '@/lib/utils';

const EditScheduleModalContainer = ({ isOpen, onClose, examData, classId, subjects }) => {
    // Prepare initial form data
    const initialFormData = useMemo(
        () => ({
            subjects: subjects?.map((subject) => ({
                subject_id: subject.id,
                class_id: subject.class_id,
                subject_name: subject.name,
                class_name: subject.class_name,
                exam_date:
                    subject.exam_subjects?.[0]?.exam_date && subject?.exam_subjects[0]?.exam_id == examData.id
                        ? dayjs(subject.exam_subjects[0].exam_date).format('YYYY-MM-DD')
                        : '',
                start_time:
                    subject.exam_subjects?.[0]?.start_time && subject?.exam_subjects[0]?.exam_id == examData.id
                        ? dayjs(subject.exam_subjects[0].start_time, 'HH:mm:ss').format('HH:mm')
                        : '',
                end_time:
                    subject.exam_subjects?.[0]?.end_time && subject?.exam_subjects[0]?.exam_id == examData.id
                        ? dayjs(subject.exam_subjects[0].end_time, 'HH:mm:ss').format('HH:mm')
                        : '',
                total_marks: subject.exam_subjects?.[0]?.total_marks || 100,
                pass_marks: subject.exam_subjects?.[0]?.pass_marks || 33,
                status: subject.exam_subjects?.[0]?.status || 'scheduled',
            })),
        }),
        [subjects],
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
        name: 'subjects',
    });

    // Watch all form values for validation
    const watchedValues = watch();

    // Reset form when modal opens/closes or data changes
    useEffect(() => {
        if (isOpen && subjects.length > 0) {
            reset(initialFormData);
        } else if (!isOpen) {
            reset();
        }
    }, [isOpen, subjects, reset, initialFormData]);

    // Form validation rules
    const validationRules = {
        exam_date: {
            // required: 'Exam date is required',
            validate: (value, formValues, index) => {
                if (!value) return true; // Skip if empty
                const startDate = examData?.start_date ? examData.start_date.split('T')[0] : null;
                const endDate = examData?.end_date ? examData.end_date.split('T')[0] : null;

                if (startDate && value < startDate) {
                    return `Date cannot be before ${dayjs(startDate).format('MMM DD, YYYY')}`;
                }
                if (endDate && value > endDate) {
                    return `Date cannot be after ${dayjs(endDate).format('MMM DD, YYYY')}`;
                }
                return true;
            },
        },
        start_time: {
            // required: 'Start time is required',
        },
        end_time: {
            // required: 'End time is required',
            validate: (value, formValues, index) => {
                const startTime = watchedValues.subjects?.[index]?.start_time;
                if (startTime && value && startTime >= value) {
                    return 'End time must be after start time';
                }
                return true;
            },
        },
        total_marks: {
            // required: 'Total marks is required',
            min: { value: 1, message: 'Total marks must be at least 1' },
            max: { value: 1000, message: 'Total marks cannot exceed 1000' },
        },
        pass_marks: {
            // required: 'Pass marks is required',
            min: { value: 1, message: 'Pass marks must be at least 1' },
            validate: (value, formValues, index) => {
                const totalMarks = watchedValues.subjects?.[index]?.total_marks;
                if (totalMarks && value && Number(value) > Number(totalMarks)) {
                    return 'Pass marks cannot be greater than total marks';
                }
                return true;
            },
        },
    };

    // Form submission handler
    const onSubmit = (formData) => {
        // Filter only subjects that have required fields filled
        const scheduledSubjects = formData.subjects.filter((subject) => subject.exam_date && subject.start_time && subject.end_time);

        if (scheduledSubjects.length === 0) {
            notification.warning({
                message: 'No Subjects Scheduled',
                description: 'Please schedule at least one subject before saving.',
                placement: 'bottomRight',
            });
            return;
        }

        router.post(
            route('department.exams.subjects.store', { exam_id: examData?.id }),
            {
                subjects: scheduledSubjects.map((subject) => ({
                    subject_id: subject.subject_id,
                    class_id: subject.class_id,
                    exam_date: subject.exam_date,
                    start_time: subject.start_time,
                    end_time: subject.end_time,
                    total_marks: Number(subject.total_marks),
                    pass_marks: Number(subject.pass_marks),
                })),
            },
            {
                onSuccess: () => {
                    notification.success({
                        message: 'Success',
                        description: 'Exam schedule updated successfully',
                        placement: 'bottomRight',
                    });
                    onClose();
                },
                onError: (errors) => {
                    notification.error({
                        message: 'Error',
                        description: errors.message || 'Failed to save exam schedule',
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
            <div className="mb-4 text-6xl text-[#AFAFAF]">📚</div>
            <h3 className="mb-2 text-lg font-medium text-[#131313]">No Subjects Available</h3>
            <p className="text-sm text-[#4A4A4A]">There are no subjects available for this class to schedule.</p>
        </div>
    );

    const renderFormField = (field, index, fieldName, inputProps = {}) => {
        const error = errors?.subjects?.[index]?.[fieldName];
        const fieldRegister = register(`subjects.${index}.${fieldName}`, validationRules[fieldName]);

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

    const renderScheduleTable = () => (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="rounded border-[0.5px] border-[#AFAFAF]">
                <div className="overflow-x-auto">
                    <div className="grid min-w-[1000px] grid-cols-6 gap-0">
                        {/* Header Row */}
                        <div className="border-b-[0.5px] border-[#AFAFAF] bg-[#F2F2F2] p-4">
                            <span className="text-base font-medium text-[#131313]">Subjects</span>
                        </div>
                        <div className="border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] bg-[#F2F2F2] p-4">
                            <span className="text-base font-medium text-[#131313]">Exam Date</span>
                        </div>
                        <div className="border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] bg-[#F2F2F2] p-4">
                            <span className="text-base font-medium text-[#131313]">Start Time</span>
                        </div>
                        <div className="border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] bg-[#F2F2F2] p-4">
                            <span className="text-base font-medium text-[#131313]">End Time</span>
                        </div>
                        <div className="border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] bg-[#F2F2F2] p-4">
                            <span className="text-base font-medium text-[#131313]">Full Mark</span>
                        </div>
                        <div className="border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] bg-[#F2F2F2] p-4">
                            <span className="text-base font-medium text-[#131313]">Pass Mark</span>
                        </div>

                        {/* Data Rows */}
                        {fields.map((field, index) => (
                            <React.Fragment key={field.id}>
                                {/* Subject Name */}
                                <div
                                    className={cn(
                                        'flex items-center border-b-[0.5px] border-[#AFAFAF] p-4',
                                        index % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]',
                                    )}
                                >
                                    <span className="text-base text-[#4A4A4A]">{field.subject_name || 'Unknown Subject'}</span>
                                </div>

                                {/* Exam Date */}
                                <div
                                    className={cn(
                                        'relative border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] p-2',
                                        index % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]',
                                    )}
                                >
                                    {renderFormField(field, index, 'exam_date', {
                                        type: 'date',
                                        min: examData?.start_date ? examData.start_date.split('T')[0] : undefined,
                                        max: examData?.end_date ? examData.end_date.split('T')[0] : undefined,
                                    })}
                                </div>

                                {/* Start Time */}
                                <div
                                    className={cn(
                                        'relative border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] p-2',
                                        index % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]',
                                    )}
                                >
                                    {renderFormField(field, index, 'start_time', {
                                        type: 'time',
                                    })}
                                </div>

                                {/* End Time */}
                                <div
                                    className={cn(
                                        'relative border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] p-2',
                                        index % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]',
                                    )}
                                >
                                    {renderFormField(field, index, 'end_time', {
                                        type: 'time',
                                    })}
                                </div>

                                {/* Full Marks */}
                                <div
                                    className={cn(
                                        'relative border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] p-2',
                                        index % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]',
                                    )}
                                >
                                    {renderFormField(field, index, 'total_marks', {
                                        type: 'number',
                                        min: 1,
                                        max: 1000,
                                        placeholder: 'Enter total marks',
                                    })}
                                </div>

                                {/* Pass Marks */}
                                <div
                                    className={cn(
                                        'relative border-b-[0.5px] border-l-[0.5px] border-[#AFAFAF] p-2',
                                        index % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]',
                                    )}
                                >
                                    {renderFormField(field, index, 'pass_marks', {
                                        type: 'number',
                                        min: 1,
                                        max: watchedValues.subjects?.[index]?.total_marks || 1000,
                                        placeholder: 'Enter pass marks',
                                    })}
                                </div>
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
                    btnText="Save Schedule"
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
            title={<h1 className="border-b border-[#AFAFAF] pb-3 text-[20px] font-semibold text-[#111827]">Edit Schedule</h1>}
            footer={null}
        >
            <div className="space-y-6 p-6">{fields.length === 0 ? renderEmptyState() : renderScheduleTable()}</div>
        </ModalUI>
    );
};

export default EditScheduleModalContainer;
