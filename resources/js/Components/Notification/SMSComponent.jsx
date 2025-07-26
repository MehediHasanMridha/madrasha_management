import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoAdd, IoClose } from 'react-icons/io5';
import Field from '../UI/Field';
import LoadingUI from '../UI/LoadingUI';
import StaticBtn from '../UI/StaticBtn';
import ToggleUI from '../UI/ToggleUI';

const SMSComponent = ({ departments, sms_balance }) => {
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
                console.error('Error sending SMS:', error);
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
        <div className="mt-6 space-y-3">
            <div className="flex space-x-10 rounded-lg bg-white p-10">
                <div className="">
                    <h2 className="text-2xl font-semibold text-gray-800">{sms_balance} BDT</h2>
                    <p className="text-sm text-gray-500">SMS Balance</p>
                </div>
                <div className="">
                    <h2 className="text-2xl font-semibold text-gray-800">0.45 BDT</h2>
                    <p className="text-sm text-gray-500">Per page SMS rate (140 character = 1 SMS)</p>
                </div>
            </div>

            <Field label="SMS Message" className="relative w-full rounded-lg bg-white p-6" error={errors.sms_message}>
                <>
                    <Controller
                        name="sms_message"
                        control={control}
                        rules={{ required: 'SMS message is required' }}
                        render={({ field }) => (
                            <div className="relative">
                                <textarea
                                    {...field}
                                    className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                    rows={6}
                                    placeholder="Enter your SMS message here.........."
                                />
                                <div className="mt-2 flex justify-between text-sm text-gray-600">
                                    <span>
                                        {characterCount} characters | {smsCount} SMS {smsCount > 1 ? 'messages' : 'message'}
                                    </span>
                                    <span className="text-blue-600">Cost: {(smsCount * 0.45).toFixed(2)} BDT</span>
                                </div>
                            </div>
                        )}
                    />
                    <StaticBtn className="my-2" onClick={handleSubmit(onSubmit)}>
                        Send
                    </StaticBtn>
                </>
            </Field>
            {/* Recipient Selection Section */}
            <Field label="Choose who will get this SMS" className="relative w-full rounded-lg bg-white p-6">
                <div className="space-y-4">
                    {/* All Students */}
                    <div className="flex items-center justify-between rounded-xl bg-[#F6F6F6] p-4">
                        <span className="text-base text-[#131313]">All student</span>
                        <Controller
                            name="all_students"
                            control={control}
                            render={({ field }) => (
                                <ToggleUI {...field} checked={field.value} onChange={(value) => field.onChange(value)} className="ml-2" />
                            )}
                        />
                    </div>

                    {/* All Staff */}
                    <div className="flex items-center justify-between rounded-xl bg-[#F6F6F6] p-4">
                        <span className="text-base text-[#131313]">All staff</span>
                        <Controller
                            name="all_staff"
                            control={control}
                            render={({ field }) => (
                                <ToggleUI {...field} checked={field.value} onChange={(value) => field.onChange(value)} className="ml-2" />
                            )}
                        />
                    </div>

                    {/* Due Students */}
                    <div className="flex items-center justify-between rounded-xl bg-[#F6F6F6] p-4">
                        <span className="text-base text-[#131313]">Due students</span>
                        <Controller
                            name="due_students"
                            control={control}
                            render={({ field }) => (
                                <ToggleUI {...field} checked={field.value} onChange={(value) => field.onChange(value)} className="ml-2" />
                            )}
                        />
                    </div>

                    {/* Selected Departments */}
                    <div className="space-y-4 rounded-xl bg-[#F6F6F6] p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-base text-[#131313]">Selected departments</span>
                            <Controller
                                name="selected_departments"
                                control={control}
                                render={({ field }) => (
                                    <ToggleUI {...field} checked={field.value} onChange={(value) => field.onChange(value)} className="ml-2" />
                                )}
                            />
                        </div>

                        {departments &&
                            selected_departments &&
                            departments.map((department) => (
                                <div key={department.id} className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={isDepartmentSelected(department.id)}
                                            onChange={() => handleDepartmentToggle(department.id)}
                                            className="h-6 w-6 rounded border-[#AFAFAF] text-[#0267FF] focus:ring-[#0267FF]"
                                        />
                                        <span className="w-32 text-base text-[#131313]">{department.name}</span>
                                        <select
                                            value={getSelectedClass(department.id)}
                                            onChange={(e) => handleClassChange(department.id, e.target.value)}
                                            disabled={!isDepartmentSelected(department.id)}
                                            className="w-32 rounded-lg border-1 border-[#AFAFAF] bg-white px-2 py-1 focus:outline-0 disabled:bg-gray-100 disabled:text-gray-400"
                                        >
                                            <option value="all">All class</option>
                                            {department.classes &&
                                                department.classes.map((cls) => (
                                                    <option key={cls.id} value={cls.id}>
                                                        {cls.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Selected Students */}
                    <div className="space-y-4 rounded-xl bg-[#F6F6F6] p-4">
                        <span className="text-base text-[#131313]">Selected students</span>

                        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#AFAFAF] p-3">
                            {selected_student_ids.map((studentId, index) => (
                                <div key={index} className="flex items-center gap-2 rounded-full border border-[#AFAFAF] bg-gray-100 px-2 py-1">
                                    <span className="text-sm text-[#666666]">{studentId}</span>
                                    <button type="button" onClick={() => removeStudentId(studentId)} className="text-[#AFAFAF] hover:text-gray-700">
                                        <IoClose className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addStudentId}
                                className="flex items-center gap-2 px-2 py-1 text-sm text-[#666666] hover:text-gray-800"
                            >
                                <IoAdd className="h-4 w-4 text-[#0267FF]" />
                                Add student ID
                            </button>
                        </div>
                    </div>

                    {/* Extra Numbers */}
                    <div className="rounded-xl bg-[#F6F6F6] p-4">
                        <span className="text-base text-[#131313]">Extra numbers</span>
                        <div className="items-center gap-2">
                            <textarea
                                className="mt-2 w-full rounded-lg border border-[#AFAFAF] bg-white p-2 focus:outline-0"
                                name="extra_numbers"
                                id=""
                                {...register('extra_numbers')}
                                placeholder='Enter extra numbers separated by ","'
                            ></textarea>
                        </div>
                    </div>
                </div>
            </Field>
            {loadingComponent}
        </div>
    );
};

export default SMSComponent;
