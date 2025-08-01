import NotificationTabBarComponent from '@/Components/Notification/NotificationTabBarComponent';
import SMSComponent from '@/Components/Notification/SMSComponent';
import LoadingUI from '@/Components/UI/LoadingUI';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SMSContainer = ({ departments, sms_balance }) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            sms_message: '',
            all_students: false,
            all_staff: false,
            due_students: false,
            selected_departments: false,
            department_selections: [],
            selected_student_ids: [],
        },
    });

    const selected_departments = watch('selected_departments');
    const department_selections = watch('department_selections') || [];
    const selected_student_ids = watch('selected_student_ids') || [];
    const sms_message = watch('sms_message') || '';

    // Calculate SMS count based on character length
    const characterCount = sms_message.length;
    const smsCount = Math.ceil(characterCount / 140) || 1;

    const handleDepartmentToggle = (departmentId) => {
        const currentSelections = getValues('department_selections') || [];
        const existingIndex = currentSelections.findIndex((sel) => sel.departmentId === departmentId);

        if (existingIndex >= 0) {
            // Remove department
            const updatedSelections = currentSelections.filter((sel) => sel.departmentId !== departmentId);
            setValue('department_selections', updatedSelections);
        } else {
            // Add department with default "all" class selection
            const updatedSelections = [
                ...currentSelections,
                {
                    departmentId,
                    selectedClass: 'all',
                },
            ];
            setValue('department_selections', updatedSelections);
        }
    };

    const handleClassChange = (departmentId, classId) => {
        const currentSelections = getValues('department_selections') || [];
        const updatedSelections = currentSelections.map((sel) => (sel.departmentId === departmentId ? { ...sel, selectedClass: classId } : sel));
        setValue('department_selections', updatedSelections);
    };

    const isDepartmentSelected = (departmentId) => {
        return department_selections.some((sel) => sel.departmentId === departmentId);
    };

    const getSelectedClass = (departmentId) => {
        const selection = department_selections.find((sel) => sel.departmentId === departmentId);
        return selection?.selectedClass || 'all';
    };
    const removeStudentId = (idToRemove) => {
        const currentIds = getValues('selected_student_ids') || [];
        const updatedIds = currentIds.filter((id) => id !== idToRemove);
        setValue('selected_student_ids', updatedIds);
    };

    let loadingComponent = null;
    if (loading) {
        loadingComponent = <LoadingUI fullScreen={true} />;
    }

    const onSubmit = (data) => {
        router.post(route('notifications.send-sms'), data, {
            onStart: () => {
                setLoading(true);
            },
            onSuccess: (response) => {
                if (response.props.flash.success) {
                    notification.success({
                        message: 'Success',
                        description: response.props.flash.success,
                        placement: 'bottomRight',
                    });
                }
                if (response.props.flash.error) {
                    notification.error({
                        message: 'Error',
                        description: response.props.flash.error,
                        placement: 'bottomRight',
                    });
                }
            },
            onError: (error) => {
                notification.error({
                    message: 'Error',
                    description: error?.sms_message,
                    placement: 'bottomRight',
                });
            },
            onFinish: () => {
                setLoading(false);
            },
            preserveScroll: true,
        });
    };

    const addStudentId = () => {
        // This would typically open a modal or form to add student ID
        const newStudentId = prompt('Enter student ID:');
        if (newStudentId && newStudentId.trim()) {
            const currentIds = getValues('selected_student_ids') || [];
            if (!currentIds.includes(newStudentId.trim())) {
                const updatedIds = [...currentIds, newStudentId.trim()];
                setValue('selected_student_ids', updatedIds);
            }
        }
    };
    return (
        <>
            <NotificationTabBarComponent tab="sms" />
            <SMSComponent
                departments={departments}
                sms_balance={sms_balance}
                addStudentId={addStudentId}
                characterCount={characterCount}
                control={control}
                errors={errors}
                handleClassChange={handleClassChange}
                handleDepartmentToggle={handleDepartmentToggle}
                isDepartmentSelected={isDepartmentSelected}
                handleSubmit={handleSubmit(onSubmit)}
                removeStudentId={removeStudentId}
                selected_departments={selected_departments}
                selected_student_ids={selected_student_ids}
                smsCount={smsCount}
                getSelectedClass={getSelectedClass}
                register={register}
                loadingComponent={loadingComponent}
            />
        </>
    );
};

export default SMSContainer;
