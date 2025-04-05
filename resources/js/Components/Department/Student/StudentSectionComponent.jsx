import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';
import StaticBtn from '@/Components/UI/StaticBtn';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import StudentTableListContainer from '@/Container/Department/Student/StudentTableListContainer';
import { Controller } from 'react-hook-form';
import { RiUserAddLine } from 'react-icons/ri';
import Field from '../../UI/Field';
import FileUploadField from '../../UI/FileUploadField';

const StudentSectionComponent = ({
    contextHolder,
    department,
    students,
    filters,
    sortOrder,
    isModalOpen,
    isLoading,
    handleOk,
    handleCancel,
    setIsModalOpen,
    handleSubmit,
    onSubmit,
    register,
    errors,
    control,
    setIsLoading,
}) => {
    return (
        <>
            {contextHolder}
            <div className="mt-[8px] flex w-full flex-col items-end space-y-5 rounded-[8px] bg-white p-[24px] text-center">
                <StaticBtn onClick={() => setIsModalOpen(true)}>
                    <RiUserAddLine className="inline-flex" /> <span>Add Student</span>
                </StaticBtn>
                <StudentTableListContainer
                    department={department}
                    data={students}
                    filters={filters}
                    sortOrder={sortOrder}
                    setIsLoading={setIsLoading}
                />
            </div>
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
                        <Field error={errors.name} label={'Student Name'}>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Student Name"
                                {...register('name', { required: 'Name is required' })}
                            />
                        </Field>
                        <Field label={'Student ID'} error={errors.student_id}>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Student ID"
                                {...register('student_id', { required: 'Student ID is required' })}
                            />
                        </Field>
                        <Field label={'Blood Group'} error={errors.blood_group}>
                            <select
                                className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                {...register('blood_group', { required: 'Blood Group is required' })}
                            >
                                <option value="">Select Blood Group</option>
                                <option value="N/A">N/A</option>
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
                        <Field error={errors.student_image}>
                            <Controller
                                name="student_image"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Student Image is required' }}
                                render={({ field: { ref, onChange } }) => (
                                    <FileUploadField
                                        type="picture-circle"
                                        className="rounded-full"
                                        text={'Upload Image'}
                                        ref={ref}
                                        onChange={onChange}
                                    />
                                )}
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
                            >
                                <option value="">Select District</option>
                                <option value="Madaripur">Madaripur</option>
                                <option value="Tangail">Tangail</option>
                            </select>
                        </Field>
                        <Field label={'Upazilla'} error={errors.upazilla}>
                            <select
                                name="upazilla"
                                className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                {...register('upazilla', { required: 'Upazilla is required' })}
                            >
                                <option value="">Select Upazilla</option>
                                <option value="Madaripur">Madaripur</option>
                                <option value="Tangail">Tangail</option>
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
        </>
    );
};

export default StudentSectionComponent;
