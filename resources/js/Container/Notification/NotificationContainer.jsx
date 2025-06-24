import NotificationComponent from '@/Components/Notification/NotificationComponent';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const NotificationContainer = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm();

    const watchedMessage = watch('body', '');
    const watchedTitle = watch('title', '');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: null,
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = { message: 'Title is required' };
        }

        if (!formData.message.trim()) {
            newErrors.message = { message: 'Message is required' };
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = (value) => {
        router.post(route('notifications.send-notification'), value, {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: (res) => {
                if (res.props.flash.error) {
                    notification.error({
                        message: 'Error',
                        description: res.props.flash.error,
                        placement: 'bottomRight',
                    });
                }
                if (res.props.flash.success) {
                    notification.success({
                        message: 'Success',
                        description: res.props.flash.success,
                        placement: 'bottomRight',
                    });
                }
                setIsLoading(false);
            },
        });
    };

    const handleClear = () => {
        setFormData({ title: '', message: '' });
        setErrors({});
    };

    return (
        <NotificationComponent
            errors={errors}
            isLoading={isLoading}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleClear={handleClear}
            onSubmit={onSubmit}
            register={register}
            watchedMessage={watchedMessage}
            watchedTitle={watchedTitle}
        />
    );
};

export default NotificationContainer;
