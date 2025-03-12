import { useForm } from '@inertiajs/react';

const Register = () => {
    const { post, submit, setData } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const handleSubmit = (e) => {
        console.log('🚀 ~ handleSubmit ~ e:', e);
        e.preventDefault();
        post(route('register.store'), {
            onError: (errors) => {
                console.log('🚀 ~ handleSubmit ~ errors:', errors);
            },
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setData('name', e.target.value)} placeholder="Name" />
            <input type="text" onChange={(e) => setData('email', e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e) => setData('password', e.target.value)} placeholder="password" />
            <input type="password" onChange={(e) => setData('password_confirmation', e.target.value)} placeholder="password_confirmation" />
            <button type="submit">submit</button>
        </form>
    );
};

export default Register;
