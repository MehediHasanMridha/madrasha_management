import loginImg1 from '@/assets/images/loginImg1.png';
import loginImg2 from '@/assets/images/loginImg2.png';
import LoginComponent from '@/Components/Auth/LoginComponent';
import { useForm } from '@inertiajs/react';
const Login = () => {
    const { post, setData } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login.store'));
    };

    const handleBack = () => {
        window.history.back();
    };

    return <LoginComponent handleSubmit={handleSubmit} setData={setData} loginImg1={loginImg1} loginImg2={loginImg2} />;
};

export default Login;
