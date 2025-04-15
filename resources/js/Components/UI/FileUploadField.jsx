import { cn } from '@/lib/utils';
import { ConfigProvider, Image, notification, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const FileUploadField = ({ control, fieldName, type = 'picture-card', className, text, required = false, ...props }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [api, contextHolder] = notification.useNotification();

    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        // setValue('staff_image', {
        //     file: newFileList[0],
        //     fileList: newFileList,
        // });
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleBeforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            api.error({
                message: 'You can only upload JPG/PNG file!',
                placement: 'bottomRight',
            });
            return Upload.LIST_IGNORE;
        }

        const isLt4M = file.size / 1024 / 1024 < 4;
        if (!isLt4M) {
            api.error({
                message: 'Image must be smaller than 4MB!',
                placement: 'bottomRight',
            });
            return Upload.LIST_IGNORE;
        }

        return true;
    };

    return (
        <>
            {contextHolder}
            <ConfigProvider
                theme={{
                    components: {
                        Upload: {
                            colorPrimary: '#1AA2A2',
                        },
                    },
                }}
            >
                <Upload
                    name={fieldName}
                    listType={type} // Override type if provided in props
                    fileList={fileList}
                    maxCount={1} // Override maxCount if provided in props
                    beforeUpload={handleBeforeUpload} // Override beforeUpload if provided in props
                    onPreview={handlePreview} // Override onPreview if provided in props
                    onChange={handleFileChange} // Override onChange if provided in props
                    accept={'image/png, image/jpeg'} // Override accept if provided in props
                    customRequest={({ onSuccess }) => onSuccess('ok')} // Override customRequest if provided in props
                    className={cn('w-fit rounded-lg bg-gray-300', className)}
                    {...props}
                >
                    {fileList.length < 1 && <div>{text}</div>}
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{
                            display: 'none',
                        }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
            </ConfigProvider>
        </>
    );
};

FileUploadField.Crop = ({ control, fieldName, type = 'picture-card', className, text, required = false, ...props }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [api, contextHolder] = notification.useNotification();

    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleBeforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            api.error({
                message: 'You can only upload JPG/PNG file!',
                placement: 'bottomRight',
            });
            return Upload.LIST_IGNORE;
        }
        const isLt4M = file.size / 1024 / 1024 < 4;
        if (!isLt4M) {
            api.error({
                message: 'Image must be smaller than 4MB!',
                placement: 'bottomRight',
            });
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    return (
        <>
            {contextHolder}
            <ConfigProvider
                theme={{
                    components: {
                        Upload: {
                            colorPrimary: '#1AA2A2',
                        },
                    },
                }}
            >
                <ImgCrop
                    rotationSlider
                    showReset
                    resetText="Reset"
                    zoomSlider
                    rotate
                    aspect={1}
                    grid
                    modalTitle="Crop Staff Image"
                    modalWidth={800}
                    quality={1}
                    cropShape="round"
                >
                    <Upload
                        name={fieldName}
                        listType={type}
                        fileList={fileList}
                        maxCount={1}
                        beforeUpload={handleBeforeUpload}
                        onPreview={handlePreview}
                        onChange={handleFileChange}
                        accept={'image/png, image/jpeg'}
                        customRequest={({ onSuccess }) => onSuccess('ok')}
                        className={cn('w-fit rounded-lg bg-gray-300', className)}
                        {...props}
                    >
                        {fileList.length < 1 && <div>{text}</div>}
                    </Upload>
                </ImgCrop>
            </ConfigProvider>
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default FileUploadField;
