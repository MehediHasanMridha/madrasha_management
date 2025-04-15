import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import FileUploadField from '@/Components/UI/FileUploadField';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useStudentContext } from '@/contextApi&reducer/Department/StudentContextApi';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DistrictUpazillaSelectionContainer from '../../Shared/DistrictUpazillaSelectionContainer';

const EditStudentModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { api, department, districts, districtId, upazillas, setDistrictId } = useStudentContext();
    const { modal, setModal, passData } = useBoundStore((state) => state);
    const [fileList, setFileList] = useState([]);

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

    useEffect(() => {
        if (passData) {
            setValue('name', passData.name);
            setValue('blood_group', passData.academic.blood);
            setValue('contact_number', passData.phone);
            setValue('father_name', passData.guardian.father_name);
            setValue('mother_name', passData.guardian.mother_name);
            setValue('guardian_contact_number', passData.guardian.numbers[0]);

            if (passData.image) {
                const fileObj = {
                    uid: '-1',
                    name: passData.image,
                    status: 'done',
                    url: `/uploads/student_images/${passData.image}`,
                };
                setFileList([fileObj]);
            }

            const districtObj = districts?.data.find((d) => d.name === passData.address.district);
            if (districtObj) {
                setValue('district', districtObj.name);
                setDistrictId(districtObj.id);
            }

            setValue('location', passData.address.location);
            setValue('joining_class', passData.academic.class_id);
            setValue('boarding_fee', passData.academic.boarding_fee);
            setValue('academic_fee', passData.academic.academic_fee);
            setValue('reference', passData.academic.reference);
            setValue('reference_mobile_number', passData.academic.reference_number);
        }
    }, [passData, setValue, districts]);

    // Set upazilla after upazillas are loaded
    useEffect(() => {
        if (passData && upazillas?.data) {
            const upazillaObj = upazillas.data.find((u) => u.name === passData.address.upazilla);
            if (upazillaObj) {
                setValue('upazilla', upazillaObj.name);
            }
        }
    }, [upazillas, passData, setValue]);

    const handleCancel = () => {
        setModal({ edit: false });
        reset();
        setFileList([]);
    };

    // Handle file change for ImgCrop component
    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        if (newFileList.length > 0) {
            if (newFileList[0].originFileObj) {
                setValue('student_image', {
                    file: newFileList[0],
                    fileList: newFileList,
                });
            }
        } else {
            setValue('student_image', null);
        }
    };

    const onSubmit = (data) => {
        router.post(
            route('student.update_student', { student_id: passData.id }),
            {
                ...data,
                student_image: data.student_image?.file?.originFileObj || null,
                department_id: department.id,
            },
            {
                onStart: () => {
                    setIsLoading(true);
                },
                onSuccess: () => {
                    reset();
                    setFileList([]);
                    setModal({ edit: false });
                    api.success({
                        message: 'Student Updated Successfully',
                        placement: 'bottomRight',
                    });
                    setIsLoading(false);
                },
                onError: (errors) => {
                    // Set form errors for each field
                    Object.keys(errors).forEach((field) => {
                        if (field !== 'message') {
                            setError(field, {
                                type: 'manual',
                                message: errors[field],
                            });
                            // Set focus on the first field with an error
                            if (field === Object.keys(errors)[0]) {
                                setFocus(field);
                            }
                            api.error({
                                message: errors[field] || 'An error occurred',
                                placement: 'bottomRight',
                            });
                        }
                    });

                    setIsLoading(false);
                },
            },
        );
    };

    return (
        <ModalUI
            isModalOpen={modal.edit}
            handleCancel={handleCancel}
            width={'80%'}
            title="Edit Student"
            footer={() => (
                <SubmitBtn
                    loadingIndicator={isLoading}
                    btnText={'Update Student'}
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
                            render={({ field: { ref, onChange } }) => (
                                <FileUploadField.Crop
                                    type="picture-card"
                                    text={'Update Student Image'}
                                    fileList={fileList}
                                    onChange={handleFileChange}
                                    ref={ref}
                                />
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
                        <Controller
                            name="district"
                            control={control}
                            rules={{ required: 'District is required' }}
                            render={({ field: { ref, onChange } }) => (
                                <DistrictUpazillaSelectionContainer
                                    data={districts?.data}
                                    onChange={(value, option) => {
                                        onChange(value);
                                        setDistrictId(option?.id);
                                    }}
                                    ref={ref}
                                    defaultValue={passData?.address?.district}
                                />
                            )}
                        />
                    </Field>
                    <Field label={'Upazilla'} error={errors.upazilla}>
                        <Controller
                            name="upazilla"
                            control={control}
                            rules={{ required: 'Upazilla is required' }}
                            render={({ field: { ref, onChange } }) => (
                                <DistrictUpazillaSelectionContainer
                                    data={upazillas?.data}
                                    onChange={(value) => {
                                        onChange(value);
                                    }}
                                    ref={ref}
                                    defaultValue={passData?.address?.upazilla}
                                />
                            )}
                        />
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
                    <Field label={'Boarding Fee'} error={errors.boarding_fee}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Boarding Fee"
                            {...register('boarding_fee', { required: 'Boarding Fee is required' })}
                        />
                    </Field>
                    <Field label={'Academic Fee'} error={errors.academic_fee}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Academic Fee"
                            {...register('academic_fee', { required: 'Academic Fee is required' })}
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

export default EditStudentModalFormContainer;
