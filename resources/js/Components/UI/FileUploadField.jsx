import { cn } from '@/lib/utils';
import { ConfigProvider, Image, notification, Upload } from 'antd';
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
    const [previewImage, setPreviewImage] = useState('');
    const [api, contextHolder] = notification.useNotification();

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleBeforeUpload = (file) => {
        //check file size less than or equal 4MB
        if (file.size > 1024 * 1024 * 4) {
            api.error({
                message: 'File size is too large, please select a file that is less than 1MB.',
                placement: 'bottomRight',
            });
            return Upload.LIST_IGNORE;
        }
        return file || Upload.LIST_IGNORE;
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
                    listType={type} // "picture-circle" | "picture-card"
                    maxCount={1}
                    onPreview={handlePreview}
                    beforeUpload={handleBeforeUpload}
                    className={cn('w-fit rounded-lg bg-gray-300', className)}
                    {...props}
                >
                    <div className="group relative">
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-black">{text}</span>
                    </div>
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

export default FileUploadField;
