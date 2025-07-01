import AddStudentModalFormComponent from '@/Components/Department/Student/AddStudentModalFormComponent';
import AddWithFeeModalComponent from '@/Components/Department/Student/AddWithFeeModalComponent';
import ModalUI from '@/Components/UI/ModalUI';
import StaticBtn from '@/Components/UI/StaticBtn';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import { useStudentContext } from '@/contextApi&reducer/Department/StudentContextApi';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowCircleLeft } from 'react-icons/fa';

const AddStudentModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showWebcam, setShowWebcam] = useState(false);
    const [hasWebcamPermission, setHasWebcamPermission] = useState(false);
    const [webcamError, setWebcamError] = useState(null);
    const webcamRef = useRef(null);
    const { api, department, isModalOpen, setIsModalOpen, districts, districtId, upazillas, setDistrictId } = useStudentContext();
    const [fileList, setFileList] = useState([]);
    const [step, setStep] = useState(1);
    const [fees, setFees] = useState(null);
    const [withFee, setWithFee] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        setFocus,
        setError,
        setValue,
        getValues,
        resetField,
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
        setValue('student_image', {
            file: newFileList[0],
            fileList: newFileList,
        });
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
        const formData = { ...data };
        if (step === 1) {
            delete formData.admission_fee;
            delete formData.month;
            delete formData.withFee;
        }
        if (step === 2) {
            formData.withFee = true;
            if (!withFee) {
                delete formData.month;
            }
        }
        router.post(
            route('student.add_student', { department_slug: department.slug }),
            {
                ...formData,
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
                    setIsModalOpen(false);
                    api.success({
                        message: 'Student Added Successfully',
                        placement: 'bottomRight',
                    });
                    setIsLoading(false);
                },
                onError: (errors) => {
                    // Set form errors for each field
                    Object.keys(errors).forEach((field) => {
                        if (field !== 'message') {
                            console.log('🚀 ~ Object.keys ~ field:', field);
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

    const handleNextStep = (data) => {
        setStep((prevStep) => prevStep + 1);
    };

    let content;

    switch (step) {
        case 1:
            content = (
                <AddStudentModalFormComponent
                    isModalOpen={isModalOpen}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    fileList={fileList}
                    handleFileChange={handleFileChange}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    control={control}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    districts={districts}
                    upazillas={upazillas}
                    setDistrictId={setDistrictId}
                    department={department}
                    handleSubmit={handleSubmit}
                    showWebcam={showWebcam}
                    toggleWebcam={toggleWebcam}
                    webcamRef={webcamRef}
                    capture={capture}
                    hasWebcamPermission={hasWebcamPermission}
                    webcamError={webcamError}
                    videoConstraints={videoConstraints}
                    setFees={setFees}
                />
            );
            break;
        case 2:
            content = (
                <AddWithFeeModalComponent
                    fees={fees}
                    academicFee={getValues('academic_fee')}
                    boardingFee={getValues('boarding_fee')}
                    register={register}
                    errors={errors}
                    withFee={withFee}
                    step={step}
                    setWithFee={setWithFee}
                />
            );
        default:
            break;
    }

    return (
        <ModalUI
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            handleOk={handleOk}
            width={'80%'}
            title="Add Student"
            footer={() => (
                <div className="flex justify-end gap-4">
                    {step === 1 && (
                        <StaticBtn
                            disabled={isLoading}
                            className={cn(
                                'cursor-pointer gap-x-2 rounded-[4px] bg-blue-400 hover:bg-blue-500',
                                isLoading && 'cursor-not-allowed opacity-50',
                            )}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Add with fee
                        </StaticBtn>
                    )}
                    {step === 2 && (
                        <StaticBtn
                            className="cursor-pointer gap-x-2 rounded-[4px] bg-blue-400 hover:bg-blue-500"
                            onClick={() => {
                                setStep(1);
                                resetField('admission_fee');
                            }}
                        >
                            <FaArrowCircleLeft className="text-2xl text-white" />
                            Previous
                        </StaticBtn>
                    )}
                    {step === 1 ? (
                        <StaticBtn
                            className="cursor-pointer gap-x-2 rounded-[4px] border-2 border-blue-400 bg-transparent text-blue-400 hover:bg-blue-500 hover:text-white"
                            onClick={handleSubmit(handleNextStep)}
                        >
                            Add with fee
                            {/* <FaArrowCircleRight className="text-2xl text-white" /> */}
                        </StaticBtn>
                    ) : (
                        <SubmitBtn
                            loadingIndicator={isLoading}
                            btnText={'Add Student'}
                            className="cursor-pointer bg-blue-400"
                            onClick={handleSubmit(onSubmit)}
                        />
                    )}
                </div>
            )}
        >
            {content}
        </ModalUI>
    );
};

export default AddStudentModalFormContainer;
