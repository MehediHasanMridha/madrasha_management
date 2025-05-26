import loginImg1 from '@/assets/images/loginImg1.webp';
import loginImg2 from '@/assets/images/loginImg2.webp';
import LoginComponent from '@/Components/Auth/LoginComponent';
import { useForm, usePage } from '@inertiajs/react';
import { notification } from 'antd';
const Login = () => {
    const { message } = usePage().props.flash;
    const { post, setData } = useForm({
        email: '',
        password: '',
    });

    const [api, contextHolder] = notification.useNotification();

    if (message) {
        api.error({
            message: 'Error',
            description: message,
            placement: 'bottomRight',
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login.store'), {
            onSuccess: (res) => {
                setData({
                    email: '',
                    password: '',
                });
            },
            onError: (errors) => {
                if (errors.email) {
                    api.error({
                        message: 'Error',
                        description: errors.email,
                        placement: 'bottomRight',
                    });
                }
                if (errors.password) {
                    api.error({
                        message: 'Error',
                        description: errors.password,
                        placement: 'bottomRight',
                    });
                }
            },
        });
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <>
            {contextHolder}
            <LoginComponent handleSubmit={handleSubmit} setData={setData} loginImg1={loginImg1} loginImg2={loginImg2} />
        </>
    );
};

export default Login;
