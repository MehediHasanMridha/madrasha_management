import EditStaffModalComponent from '@/Components/Staff/EditStaffModalFormComponent';
import { useStaffContext } from '@/contextApi&reducer/Staff/StaffContextApi';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const EditStaffModalFormContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { modal, setModal, passData } = useBoundStore((state) => state);
    const { api, districts, districtId, upazillas, setDistrictId } = useStaffContext();
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
            setValue('blood_group', passData.blood_group);
            setValue('contact_number', passData.phone);
            setValue('designation', passData.designation);
            setValue('salary', passData.salary);
            setValue('father_name', passData.guardian?.father_name);
            setValue('mother_name', passData.guardian?.mother_name);
            setValue('guardian_contact_number', passData.guardian?.contact_number);

            const districtObj = districts?.data.find((d) => d.name === passData.address?.district);
            if (districtObj) {
                setValue('district', districtObj.name);
                setDistrictId(districtObj.id);
            }

            setValue('location', passData.address?.location);
            setValue('reference', passData.reference);
            setValue('reference_mobile_number', passData.reference_mobile_number);

            if (passData.image) {
                const fileObj = {
                    uid: '-1',
                    name: passData.image,
                    status: 'done',
                    url: `/uploads/staff_images/${passData.image}`,
                };
                setFileList([fileObj]);
            }
        }
    }, [passData, setValue, districts]);

    useEffect(() => {
        if (passData && upazillas?.data) {
            const upazillaObj = upazillas.data.find((u) => u.name === passData.address?.upazilla);
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

    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        if (newFileList.length > 0) {
            if (newFileList[0].originFileObj) {
                setValue('staff_image', {
                    file: newFileList[0],
                    fileList: newFileList,
                });
            }
        } else {
            setValue('staff_image', null);
        }
    };

    const onSubmit = (data) => {
        router.post(
            route('staff.update', { id: passData.id }),
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
                    setModal({ edit: false });
                    api.success({
                        message: 'Staff Updated Successfully',
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
        <>
            {api.contextHolder}
            <EditStaffModalComponent
                modal={modal}
                handleCancel={handleCancel}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={handleCancel}
                register={register}
                errors={errors}
                control={control}
                fileList={fileList}
                handleFileChange={handleFileChange}
                isLoading={isLoading}
                setValue={setValue}
                setDistrictId={setDistrictId}
                districts={districts}
                upazillas={upazillas}
                passData={passData}
            />
        </>
    );
};

export default EditStaffModalFormContainer;
