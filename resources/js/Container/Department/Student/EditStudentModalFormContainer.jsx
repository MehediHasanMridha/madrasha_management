import EditStudentModalFormComponent from '@/Components/Department/Student/EditStudentModalFormComponent';
import { useStudentContext } from '@/contextApi&reducer/Department/StudentContextApi';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const EditStudentModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showWebcam, setShowWebcam] = useState(false);
    const [hasWebcamPermission, setHasWebcamPermission] = useState(false);
    const [webcamError, setWebcamError] = useState(null);
    const webcamRef = useRef(null);
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

    useEffect(() => {
        if (passData && upazillas?.data) {
            const upazillaObj = upazillas.data.find((u) => u.name === passData.address.upazilla);
            if (upazillaObj) {
                setValue('upazilla', upazillaObj.name);
            }
        }
    }, [upazillas, passData, setValue]);

    useEffect(() => {
        if (showWebcam) {
            handleWebcamPermission();
        }
    }, [showWebcam]);

    const handleCancel = () => {
        setModal({ edit: false });
        reset();
        setFileList([]);
        setShowWebcam(false);
    };

    const videoConstraints = {
        width: 320,
        height: 320,
        facingMode: 'user',
        aspectRatio: 1,
    };

    const handleWebcamPermission = async () => {
        if (showWebcam) {
            setWebcamError(null);
            try {
                await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
                setHasWebcamPermission(true);
                setWebcamError(null);
            } catch (err) {
                console.error('Webcam error:', err);
                setHasWebcamPermission(false);
                setWebcamError(err.message);
            }
        }
    };

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

    const capture = useCallback(() => {
        if (webcamRef.current) {
            try {
                const imageSrc = webcamRef.current.getScreenshot();
                if (imageSrc) {
                    fetch(imageSrc)
                        .then((res) => res.blob())
                        .then((blob) => {
                            const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
                            const tempFileList = [
                                {
                                    originFileObj: file,
                                    name: file.name,
                                    type: file.type,
                                },
                            ];
                            setValue('student_image', {
                                file: { originFileObj: file },
                                fileList: {
                                    originFileObj: file,
                                    name: file.name,
                                    type: file.type,
                                },
                            });
                            setFileList(tempFileList);
                            setShowWebcam(false);
                        })
                        .catch((error) => {
                            console.error('Error converting image:', error);
                            setWebcamError('Failed to process captured image');
                        });
                } else {
                    setWebcamError('Failed to capture image');
                }
            } catch (error) {
                console.error('Capture error:', error);
                setWebcamError('Failed to capture image');
            }
        }
    }, [webcamRef]);

    const toggleWebcam = () => {
        setShowWebcam((prev) => !prev);
        setWebcamError(null);
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
                    Object.keys(errors).forEach((field) => {
                        if (field !== 'message') {
                            setError(field, {
                                type: 'manual',
                                message: errors[field],
                            });
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
            showWebcam={showWebcam}
            toggleWebcam={toggleWebcam}
            webcamRef={webcamRef}
            capture={capture}
            hasWebcamPermission={hasWebcamPermission}
            webcamError={webcamError}
            videoConstraints={videoConstraints}
        />
    );
};

export default EditStudentModalFormContainer;
