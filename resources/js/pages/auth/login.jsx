import { useForm } from '@inertiajs/react';

const Login = () => {
    const { post, submit, setData } = useForm({
        email: '',
        password: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login.store'));
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setData('email', e.target.value)} placeholder="Email" />
            <input type="text" onChange={(e) => setData('password', e.target.value)} placeholder="password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
