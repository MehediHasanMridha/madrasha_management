import DistrictUpazillaSelectionContainer from '@/Container/Shared/DistrictUpazillaSelectionContainer';
import { Controller } from 'react-hook-form';
import Webcam from 'react-webcam';
import Field from '../UI/Field';
import FieldSet from '../UI/FieldSet';
import FileUploadField from '../UI/FileUploadField';
import ModalUI from '../UI/ModalUI';
import StaticBtn from '../UI/StaticBtn';
import SubmitBtn from '../UI/SubmitBtn';

const AddStaffModalFormComponent = ({
    isModalOpen,
    handleOk,
    handleCancel,
    control,
    register,
    errors,
    fileList,
    handleFileChange,
    handleSubmit,
    onSubmit,
    isLoading,
    setValue,
    districts,
    setDistrictId,
    upazillas,
    showWebcam,
    toggleWebcam,
    webcamRef,
    capture,
    hasWebcamPermission,
    webcamError,
    videoConstraints,
}) => {
    return (
        <ModalUI
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            width={'80%'}
            title="Add Staff"
            footer={() => (
                <SubmitBtn
                    loadingIndicator={isLoading}
                    btnText={'Add Staff'}
                    className="cursor-pointer bg-blue-400"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        >
            <form className="max-h-[70vh] overflow-y-scroll">
                <FieldSet label={'Personal Information'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field label={'Staff Photo'} error={errors.staff_image}>
                        <div className="space-y-4">
                            <div className="mt-4 flex gap-2">
                                <Controller
                                    name="staff_image"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { ref } }) => (
                                        <FileUploadField.Crop
                                            type="picture-card"
                                            text="Upload From Computer"
                                            fileList={fileList}
                                            onChange={handleFileChange}
                                            className={
                                                'h-fit w-fit rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] text-center focus:outline-0'
                                            }
                                            ref={ref}
                                        />
                                    )}
                                />
                                <StaticBtn
                                    className="w-[110px] rounded-[8px] border-[1px] border-[#AFAFAF] px-[0px] py-[12px] text-center focus:outline-0"
                                    onClick={toggleWebcam}
                                >
                                    {showWebcam ? 'Switch to File Upload' : 'Use Webcam'}
                                </StaticBtn>
                            </div>

                            {showWebcam && (
                                <div className="space-y-4">
                                    {webcamError && <div className="text-red-500">{webcamError}</div>}
                                    {!hasWebcamPermission ? (
                                        <div className="text-red-500">Please allow camera access to use this feature</div>
                                    ) : (
                                        <ModalUI
                                            isModalOpen={showWebcam}
                                            handleCancel={toggleWebcam}
                                            width={'80%'}
                                            title="Capture Image"
                                            width={'20%'}
                                            onCancel={toggleWebcam}
                                        >
                                            <div className="space-y-4">
                                                <div className="h-[320px] w-[320px] overflow-hidden rounded-lg border">
                                                    <Webcam
                                                        audio={false}
                                                        ref={webcamRef}
                                                        screenshotFormat="image/jpeg"
                                                        videoConstraints={videoConstraints}
                                                        width={320}
                                                        height={320}
                                                        mirrored={true}
                                                    />
                                                </div>
                                                <div className="flex justify-center gap-4">
                                                    <StaticBtn onClick={toggleWebcam} className="bg-red-500">
                                                        Cancel
                                                    </StaticBtn>
                                                    <StaticBtn onClick={capture}>Capture Photo</StaticBtn>
                                                </div>
                                            </div>
                                        </ModalUI>
                                    )}
                                </div>
                            )}
                        </div>
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
                                        setValue('upazilla', null);
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

                <FieldSet label={'Academic Information'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field label={'Designation'} error={errors.designation}>
                        <select
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            {...register('designation', { required: 'Designation is required' })}
                        >
                            <option value="">Select Designation</option>
                            <option value="Principle">Principle</option>
                            <option value="Islamic shool">Islamic shool</option>
                            <option value="Kitab bivag (Kodim)">Kitab bivag (Kodim)</option>
                            <option value="Kitab bivag (Madani)">Kitab bivag (Madani)</option>
                            <option value="Hifjo bivag">Hifjo bivag</option>
                            <option value="Najera bivag">Najera bivag</option>
                            <option value="Hifjo revision">Hifjo revision</option>
                            <option value="Accountant">Accountant</option>
                            <option value="Office assistant">Office assistant</option>
                            <option value="Other staff">Other staff</option>
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
    );
};

export default AddStaffModalFormComponent;
