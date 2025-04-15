import AddStaffModalComponent from '@/Components/Staff/AddStaffModalFormComponent';
import { useStaffContext } from '@/contextApi&reducer/Staff/StaffContextApi';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddStaffModalFormContainer = () => {
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

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Handle file change for ImgCrop component
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
                    // Reset form
                    reset();

                    // Clear image states
                    setFileList([]);

                    // Close modal
                    setIsModalOpen(false);

                    // Show success message
                    api.success({
                        message: 'Staff Added Successfully',
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
        />
    );
};

export default AddStaffModalFormContainer;
