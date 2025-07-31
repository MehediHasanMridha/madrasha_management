import LoginComponent from '@/Components/Auth/LoginComponent';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
const LoginContainer = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        router.post(route('login.store'), data, {
            onSuccess: (response) => {
                notification.success({
                    message: 'Success',
                    description: 'Login successful!',
                    placement: 'bottomRight',
                });
            },
            onError: (errors) => {
                if (errors.email) {
                    notification.error({
                        message: 'Error',
                        description: errors.email,
                        placement: 'bottomRight',
                    });
                }
                if (errors.password) {
                    notification.error({
                        message: 'Error',
                        description: errors.password,
                        placement: 'bottomRight',
                    });
                }
            },
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <LoginComponent
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit(onSubmit)}
            />
        </>
    );
};

export default LoginContainer;
