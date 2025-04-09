import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import FileUploadField from '@/Components/UI/FileUploadField';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useStudentContext } from '@/contextApi&reducer/Department/StudentContextApi';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const AddStudentModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { api, department, isModalOpen, setIsModalOpen, districts, districtId, upazillas, setDistrictId } = useStudentContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        setFocus,
        setError,
        setValue,
    } = useForm();

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit = (data) => {
        console.log('🚀 ~ onSubmit ~ data:', data);
        router.post(
            route('student.add_student', { department_slug: department.slug }),
            {
                ...data,
                student_image: data.student_image ? data.student_image.file.originFileObj : null,
                department_id: department.id,
                district: JSON.parse(data.district).name,
                upazilla: JSON.parse(data.upazilla).name,
            },
            {
                onStart: () => {
                    setIsLoading(true);
                },
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                    api.success({
                        message: 'Student Added Successfully',
                        placement: 'bottomRight',
                    });
                    setIsLoading(false);
                },
                onError: (errors) => {
                    console.log('🚀 ~ onSubmit ~ errors:', errors);
                    if (errors.student_id) {
                        setFocus('student_id');
                        setError('student_id', {
                            message: errors.student_id,
                        });
                    } else {
                        setFocus('contact_number');
                        setError('contact_number', {
                            message: errors.contact_number,
                        });
                    }
                    api.error({
                        message: errors.student_id || errors.contact_number || errors.academic_fee,
                        placement: 'bottomRight',
                    });
                    setIsLoading(false);
                },
            },
        );
    };

    return (
        <ModalUI
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            width={'80%'}
            title="Add Student"
            footer={() => (
                <SubmitBtn
                    loadingIndicator={isLoading}
                    btnText={'Add Student'}
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <form className="max-h-[70vh] overflow-y-scroll">
                <FieldSet label={'Personal Information'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field error={errors.student_image}>
                        <Controller
                            name="student_image"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Student Image is required' }}
                            render={({ field: { ref, onChange } }) => (
                                <FileUploadField type="picture-card" text={'Upload Image'} ref={ref} onChange={onChange} />
                            )}
                        />
                    </Field>
                    <Field error={errors.name} label={'Student Name'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Student Name"
                            {...register('name', { required: 'Name is required' })}
                        />
                    </Field>
                    <Field label={'Blood Group'} error={errors.blood_group}>
                        <select
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            {...register('blood_group')}
                        >
                            <option value="">Select Blood Group</option>
                            <option value={'null'}>N/A</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </Field>
                    <Field label={'Contact Number'} error={errors.contact_number}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Contact Number"
                            {...register('contact_number', { required: 'Contact Number is required' })}
                        />
                    </Field>
                </FieldSet>
                <FieldSet label={"Guardian's Information"} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field label={'Father Name'} error={errors.father_name}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Father Name"
                            {...register('father_name', { required: 'Father Name is required' })}
                        />
                    </Field>
                    <Field label={'Mother Name'} error={errors.mother_name}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Mother Name"
                            {...register('mother_name', { required: 'Mother Name is required' })}
                        />
                    </Field>
                    <Field label={'Contact Number'} error={errors.guardian_contact_number}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Contact Number"
                            {...register('guardian_contact_number', { required: 'Contact Number is required' })}
                        />
                    </Field>
                </FieldSet>
                <FieldSet label={'Address Information'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field label={'District'} error={errors.district}>
                        <select
                            name="district"
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            {...register('district', { required: 'District is required' })}
                            onChange={(e) => {
                                setDistrictId(JSON.parse(e.target.value).id);
                            }}
                        >
                            <option value="">Select District</option>
                            {districts?.data.map((district) => (
                                <option key={district.id} value={JSON.stringify({ id: district.id, name: district.name })}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label={'Upazilla'} error={errors.upazilla}>
                        <select
                            name="upazilla"
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            {...register('upazilla', { required: 'Upazilla is required' })}
                        >
                            <option value="">Select Upazilla</option>
                            {upazillas?.data.map((upazilla) => (
                                <option key={upazilla.id} value={JSON.stringify({ id: upazilla.id, name: upazilla.name })}>
                                    {upazilla.name}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label={'Location'}>
                        <textarea
                            name="location"
                            cols="30"
                            rows="5"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Location"
                            {...register('location')}
                        ></textarea>
                    </Field>
                </FieldSet>
                <FieldSet label={'Academic information'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field label={'Joining Class'} error={errors.joining_class}>
                        <select
                            name="joining_class"
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            {...register('joining_class', { required: 'Joining Class is required' })}
                        >
                            <option value="">Select Joining Class</option>
                            {department.classes.map((classItem) => (
                                <option value={classItem.id} key={classItem.id}>
                                    {classItem.name}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label={'Boarding fee (Optional)'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Boarding fee"
                            {...register('boarding_fee')}
                        />
                    </Field>
                    <Field label={'Academic fee (Optional)'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Academic fee"
                            {...register('academic_fee')}
                        />
                    </Field>
                    <Field label={'Reference (Optional)'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Reference (Optional)"
                            {...register('reference')}
                        />
                    </Field>
                    <Field label={'Reference mobile number (Optional)'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Reference mobile number (Optional)"
                            {...register('reference_mobile_number')}
                        />
                    </Field>
                </FieldSet>
            </form>
        </ModalUI>
    );
};

export default AddStudentModalFormContainer;
