import AddStudentModalFormComponent from '@/Components/Department/Student/AddStudentModalFormComponent';
import { useStudentContext } from '@/contextApi&reducer/Department/StudentContextApi';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddStudentModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { api, department, isModalOpen, setIsModalOpen, districts, districtId, upazillas, setDistrictId } = useStudentContext();
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

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Handle file change for ImgCrop component
    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        setValue('student_image', {
            file: newFileList[0],
            fileList: newFileList,
        });
    };

    const onSubmit = (data) => {
        router.post(
            route('student.add_student', { department_slug: department.slug }),
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

    return (
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
        />
    );
};

export default AddStudentModalFormContainer;
