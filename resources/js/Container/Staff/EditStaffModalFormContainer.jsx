import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import FileUploadField from '@/Components/UI/FileUploadField';
import ModalUI from '@/Components/UI/ModalUI';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useStaffContext } from '@/contextApi&reducer/Staff/StaffContextApi';
import { useStaffBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const EditStaffModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { modal, setModal, passData } = useStaffBoundStore((state) => state);
    const { api, districts, districtId, upazillas, setDistrictId } = useStaffContext();

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
            setValue('blood_group', passData.blood_group);
            setValue('contact_number', passData.phone);
            setValue('designation', passData.designation);
            setValue('salary', passData.salary);
            setValue('father_name', passData.guardian?.father_name);
            setValue('mother_name', passData.guardian?.mother_name);
            setValue('guardian_contact_number', passData.guardian?.contact_number);

            // Find and set district from the list
            const districtObj = districts?.data.find((d) => d.name === passData.address?.district);
            if (districtObj) {
                setValue('district', JSON.stringify({ id: districtObj.id, name: districtObj.name }));
                setDistrictId(districtObj.id);
            }

            setValue('location', passData.address?.location);
            setValue('reference', passData.reference);
            setValue('reference_mobile_number', passData.reference_mobile_number);
        }
    }, [passData, setValue, districts]);

    // Set upazilla after upazillas are loaded
    useEffect(() => {
        if (passData && upazillas?.data) {
            const upazillaObj = upazillas.data.find((u) => u.name === passData.address?.upazilla);
            if (upazillaObj) {
                setValue('upazilla', JSON.stringify({ id: upazillaObj.id, name: upazillaObj.name }));
            }
        }
    }, [upazillas, passData, setValue]);

    const handleCancel = () => {
        setModal({ edit: false });
        reset();
    };

    const onSubmit = (data) => {
        router.post(
            route('staff.update', { id: passData.id }),
            {
                ...data,
                staff_image: data.staff_image ? data.staff_image.file.originFileObj : null,
                district: JSON.parse(data.district).name,
                upazilla: JSON.parse(data.upazilla).name,
            },
            {
                onStart: () => {
                    setIsLoading(true);
                },
                onSuccess: () => {
                    reset();
                    setModal({ edit: false });
                    api.success({
                        message: 'Staff Updated Successfully',
                        placement: 'bottomRight',
                    });
                    setIsLoading(false);
                },
                onError: (errors) => {
                    if (errors.contact_number) {
                        setFocus('contact_number');
                        setError('contact_number', {
                            message: errors.contact_number,
                        });
                    }
                    api.error({
                        message: errors.contact_number,
                        placement: 'bottomRight',
                    });
                    setIsLoading(false);
                },
            },
        );
    };

    return (
        <>
            {api.contextHolder}
            <ModalUI
                isModalOpen={modal.edit}
                handleCancel={handleCancel}
                width={'80%'}
                title="Edit Staff"
                footer={() => (
                    <SubmitBtn
                        loadingIndicator={isLoading}
                        btnText={'Update Staff'}
                        className="cursor-pointer bg-blue-400"
                        onClick={handleSubmit(onSubmit)}
                    />
                )}
            >
                <form className="max-h-[70vh] overflow-y-scroll">
                    <FieldSet label={'Personal Information'} labelClassName="text-[16px] font-bold" hr={true}>
                        <Field error={errors.staff_image}>
                            <Controller
                                name="staff_image"
                                control={control}
                                defaultValue=""
                                render={({ field: { ref, onChange } }) => (
                                    <FileUploadField type="picture-card" text={'Upload Image'} ref={ref} onChange={onChange} />
                                )}
                            />
                        </Field>
                        <Field error={errors.name} label={'Staff Name'}>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Staff Name"
                                {...register('name', { required: 'Name is required' })}
                            />
                        </Field>
                        <Field label={'Blood Group'} error={errors.blood_group}>
                            <select
                                className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                {...register('blood_group', { required: 'Blood Group is required' })}
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
                                placeholder="Enter Guardian Contact Number"
                                {...register('guardian_contact_number', { required: 'Guardian Contact Number is required' })}
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

                    <FieldSet label={'Academic Information'} labelClassName="text-[16px] font-bold" hr={true}>
                        <Field label={'Designation'} error={errors.designation}>
                            <select
                                className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                {...register('designation', { required: 'Designation is required' })}
                            >
                                <option value="">Select Designation</option>
                                <option value="Head Teacher">Head Teacher</option>
                                <option value="Assistant Teacher">Assistant Teacher</option>
                                <option value="Senior Teacher">Senior Teacher</option>
                                <option value="Instructor">Instructor</option>
                                <option value="Hafiz">Hafiz</option>
                                <option value="Qari">Qari</option>
                                <option value="Administrator">Administrator</option>
                                <option value="Office Staff">Office Staff</option>
                            </select>
                        </Field>
                        <Field label={'Salary'} error={errors.salary}>
                            <input
                                type="number"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Salary"
                                {...register('salary', {
                                    required: 'Salary is required',
                                    valueAsNumber: true,
                                    min: 0,
                                })}
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

export default EditStaffModalFormContainer;
