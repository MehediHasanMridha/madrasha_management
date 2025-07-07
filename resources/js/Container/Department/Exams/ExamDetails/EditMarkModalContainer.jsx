import Field from '@/Components/UI/Field';
import ModalUI from '@/Components/UI/ModalUI';
import StaticBtn from '@/Components/UI/StaticBtn';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import TableUI from '@/Components/UI/TableUI';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const EditMarkModalContainer = ({ isOpen, onClose, examData, classItem, students, subjects }) => {
    // Prepare initial form data
    const getInitialFormData = () => {
        if (!students || !subjects) return { students: [] };

        return {
            students: students.map((student) => ({
                student_id: student.id,
                student_name: student.name,
                student_roll: student.roll || students.indexOf(student) + 1,
                class_id: classItem.class.id,
                subjects: subjects.map((subject) => ({
                    subject_id: subject.id,
                    marks_obtained:
                        student.exam_marks?.find((mark) => mark.subject_id === subject.id && mark.exam_id === examData.id)?.marks_obtained || '',
                    total_marks: subject.exam_subjects?.[0]?.total_marks || 100,
                    pass_marks: subject.exam_subjects?.[0]?.pass_marks || 40,
                    status: student.exam_marks?.find((mark) => mark.subject_id === subject.id && mark.exam_id === examData.id)?.status || 'present',
                })),
            })),
        };
    };

    // React Hook Form setup
    const {
        control,
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: getInitialFormData(),
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
        if (isOpen && students && students.length > 0) {
            const student = setTimeout(() => {
                reset(getInitialFormData());
            }, 100);
            return () => {
                clearTimeout(student);
            };
        } else if (!isOpen) {
            reset();
        }
    }, [isOpen, students, subjects, examData, classItem, reset]);

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

    const handleCancel = () => {
        reset();
        onClose();
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
                    handleCancel();
                    // Refresh the page data to get updated marks
                    router.reload({ only: ['students'] });
                },
                onError: (errors) => {
                    notification.error({
                        message: 'Error',
                        description: errors.message || 'Failed to save marks',
                        placement: 'bottomRight',
                    });
                },
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    // Handle modal close

    // Prepare data for TableUI
    const getTableData = () => {
        if (!students || students.length === 0) return { data: [] };

        return {
            data: fields.map((student, studentIndex) => {
                const subjectData = {};
                subjects.forEach((subject, subjectIndex) => {
                    subjectData[`subject_${subject.id}`] = {
                        subjectIndex,
                        value: watchedValues.students?.[studentIndex]?.subjects?.[subjectIndex]?.marks_obtained || '',
                        totalMarks: subject.exam_subjects?.[0]?.total_marks || 100,
                    };
                });

                return {
                    key: student.student_id,
                    id: student.student_id,
                    roll: student.student_roll,
                    student_name: student.student_name,
                    studentIndex,
                    ...subjectData,
                };
            }),
        };
    };

    // Prepare columns for TableUI
    const getTableColumns = () => {
        const columns = [
            {
                title: 'Roll',
                dataIndex: 'roll',
                key: 'roll',
                width: 60,
                align: 'center',
            },
            {
                title: 'Student Name',
                dataIndex: 'student_name',
                key: 'student_name',
                width: 200,
                render: (name) => <span className="text-sm text-[#4A4A4A]">{name}</span>,
            },
        ];

        // Add dynamic subject columns
        subjects.forEach((subject) => {
            columns.push({
                title: (
                    <div>
                        <div className="text-sm font-medium text-[#131313]">{subject.name}</div>
                        <div className="mt-1 text-xs text-[#4A4A4A]">/{subject.exam_subjects?.[0]?.total_marks || 100}</div>
                    </div>
                ),
                dataIndex: `subject_${subject.id}`,
                key: `subject_${subject.id}`,
                align: 'center',
                render: (subjectData, record) => {
                    const error = errors?.students?.[record.studentIndex]?.subjects?.[subjectData.subjectIndex]?.marks_obtained;
                    const fieldRegister = register(
                        `students.${record.studentIndex}.subjects.${subjectData.subjectIndex}.marks_obtained`,
                        validationRules.marks_obtained,
                    );

                    return (
                        <Field className="relative" error={error}>
                            <input
                                {...fieldRegister}
                                type="number"
                                min={0}
                                max={subjectData.totalMarks}
                                step={0.01}
                                placeholder="0"
                                className={cn(
                                    'w-full rounded border p-2 text-sm focus:outline-none',
                                    error ? 'border-red-500 focus:border-red-500' : 'border-[#AFAFAF] focus:border-[#0267FF]',
                                )}
                            />
                        </Field>
                    );
                },
            });
        });

        return columns;
    };

    let content = null;

    // Render helpers
    if (fields?.length === 0) {
        content = (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 text-6xl text-[#AFAFAF]">📝</div>
                <h3 className="mb-2 text-lg font-medium text-[#131313]">No Students Available</h3>
                <p className="text-sm text-[#4A4A4A]">There are no students available for this class to add marks.</p>
            </div>
        );
    }

    if (fields?.length > 0) {
        content = (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <TableUI
                    data={getTableData()}
                    columns={getTableColumns()}
                    showLoading={false}
                    pagination={false}
                    size="small"
                    scroll={{ x: 'max-content' }}
                    rowClassName={(record, index) => (index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}
                    className="max-h-[550px] overflow-y-auto"
                />

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                    <StaticBtn
                        onClick={handleCancel}
                        className="rounded bg-[#F2F2F2] px-6 py-3 text-[#4A4A4A] hover:bg-gray-300"
                        disabled={isSubmitting}
                    >
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
    }

    // Main render
    return (
        <ModalUI
            isModalOpen={isOpen}
            handleCancel={handleCancel}
            width="90%"
            title={<h1 className="border-b border-[#AFAFAF] pb-3 text-[20px] font-semibold text-[#111827]">Edit Marks</h1>}
            footer={null}
            style={{ top: 0 }}
        >
            <div className="space-y-6 p-6">{content}</div>
        </ModalUI>
    );
};

export default EditMarkModalContainer;
