import BreadcrumbUI from '@/Components/UI/BreadcrumbUI';
import Field from '@/Components/UI/Field';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { notification } from 'antd';
import { useRef } from 'react';

const breadcrumbs = [
    {
        title: 'Settings',
        href: '/settings',
    },
    {
        title: 'Password',
        href: '/settings/password',
    },
];

export default function Password() {
    const passwordInput = useRef(null);
    const currentPasswordInput = useRef(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: (res) => {
                notification.success({
                    message: 'Success',
                    description: 'Password updated successfully!',
                    placement: 'bottomRight',
                });
                reset();
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Change Password" />

            <div className="space-y-6">
                <BreadcrumbUI items={breadcrumbs} />

                <div className="mx-auto max-w-2xl">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h1 className="mb-6 text-2xl font-bold text-gray-900">Change Password</h1>

                        {recentlySuccessful && (
                            <div className="mb-4 rounded-md bg-green-50 p-4">
                                <div className="text-green-800">Password updated successfully!</div>
                            </div>
                        )}

                        <form onSubmit={updatePassword} className="space-y-4">
                            <Field label="Current Password" error={errors.current_password}>
                                <input
                                    ref={currentPasswordInput}
                                    type="password"
                                    value={data.current_password}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    placeholder="Enter your current password"
                                    required
                                />
                            </Field>

                            <Field label="New Password" error={errors.password}>
                                <input
                                    ref={passwordInput}
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    placeholder="Enter new password"
                                    required
                                />
                            </Field>

                            <Field label="Confirm New Password" error={errors.password_confirmation}>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    placeholder="Confirm new password"
                                    required
                                />
                            </Field>

                            <div className="flex justify-end pt-4">
                                <SubmitBtn loadingIndicator={processing} btnText="Update Password" className="bg-red-600 hover:bg-red-700" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
