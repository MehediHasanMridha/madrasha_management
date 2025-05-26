import { useForm } from '@inertiajs/react';

const ResetPassword = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
    return <div>ResetPassword</div>;
};

export default ResetPassword;
