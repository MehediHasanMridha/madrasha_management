import AddStaffModalComponent from '@/Components/Staff/AddStaffModalFormComponent';
import { useStaffContext } from '@/contextApi&reducer/Staff/StaffContextApi';
import { router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const AddStaffModalFormContainer = () => {
    const [showWebcam, setShowWebcam] = useState(false);
    const [hasWebcamPermission, setHasWebcamPermission] = useState(false);
    const [webcamError, setWebcamError] = useState(null);
    const webcamRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const { api, isModalOpen, setIsModalOpen, districts, districtId, upazillas, setDistrictId } = useStaffContext();
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
        if (showWebcam) {
            handleWebcamPermission();
        }
    }, [showWebcam]);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        reset();
        setFileList([]);
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
        setValue('staff_image', {
            file: newFileList[0],
            fileList: newFileList,
        });
    };

    const onSubmit = (data) => {
        router.post(
            route('staff.store'),
            {
                ...data,
                staff_image: data.staff_image?.file?.originFileObj || null,
            },
            {
                onStart: () => {
                    setIsLoading(true);
                },
                onSuccess: () => {
                    reset();
                    setFileList([]);
                    setShowWebcam(false);
                    setIsModalOpen(false);
                    api.success({
                        message: 'Staff Added Successfully',
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

    const capture = useCallback(() => {
        if (webcamRef.current) {
            try {
                const imageSrc = webcamRef.current.getScreenshot();
                if (imageSrc) {
                    fetch(imageSrc)
                        .then((res) => res.blob())
                        .then((blob) => {
                            const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
                            setShowCropModal(true);
                            const tempFileList = [
                                {
                                    originFileObj: file,
                                    name: file.name,
                                    type: file.type,
                                },
                            ];
                            setValue('staff_image', {
                                file: { originFileObj: file },
                                fileList: {
                                    originFileObj: file,
                                    name: file.name,
                                    type: file.type,
                                },
                            });
                            setFileList(tempFileList);
                            setShowCropModal(true);
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

    return (
        <>
            <AddStaffModalComponent
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                control={control}
                register={register}
                errors={errors}
                fileList={fileList}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                isLoading={isLoading}
                setValue={setValue}
                districts={districts}
                setDistrictId={setDistrictId}
                upazillas={upazillas}
                showWebcam={showWebcam}
                toggleWebcam={toggleWebcam}
                webcamRef={webcamRef}
                capture={capture}
                hasWebcamPermission={hasWebcamPermission}
                webcamError={webcamError}
                videoConstraints={videoConstraints}
            />
        </>
    );
};

export default AddStaffModalFormContainer;
