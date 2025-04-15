import EditStudentModalFormComponent from '@/Components/Department/Student/EditStudentModalFormComponent';
import { useStudentContext } from '@/contextApi&reducer/Department/StudentContextApi';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
        <EditStudentModalFormComponent
            isLoading={isLoading}
            onSubmit={onSubmit}
            handleCancel={handleCancel}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            control={control}
            fileList={fileList}
            handleFileChange={handleFileChange}
            setValue={setValue}
            passData={passData}
            modal={modal}
            districts={districts}
            upazillas={upazillas}
            department={department}
            setDistrictId={setDistrictId}
        />
    );
};

export default EditStudentModalFormContainer;
