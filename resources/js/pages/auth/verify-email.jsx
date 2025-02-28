// Components
import { useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return <div className="">VerifyEmail</div>;
}
