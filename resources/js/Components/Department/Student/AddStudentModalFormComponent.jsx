import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import FileUploadField from '@/Components/UI/FileUploadField';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import DistrictUpazillaSelectionContainer from '@/Container/Shared/DistrictUpazillaSelectionContainer';
import { Controller } from 'react-hook-form';

const AddStudentModalFormComponent = ({
    isModalOpen,
    handleOk,
    handleCancel,
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    fileList,
    handleFileChange,
    setValue,
    districts,
    setDistrictId,
    upazillas,
    register,
    department,
}) => {
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
                            render={({ field: { ref, onChange } }) => (
                                <FileUploadField.Crop
                                    type="picture-card"
                                    text={'Upload Student Image'}
                                    fileList={fileList}
                                    onChange={handleFileChange}
                                    ref={ref}
                                    {...register('student_image')}
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
                                        setValue('upazilla', null); // Reset upazilla when district changes
                                    }}
                                    ref={ref}
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
                    <Field label={'Boarding fee (Optional)'} error={errors.boarding_fee}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Boarding fee"
                            {...register('boarding_fee')}
                        />
                    </Field>
                    <Field label={'Academic fee (Optional)'} error={errors.academic_fee}>
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

export default AddStudentModalFormComponent;
