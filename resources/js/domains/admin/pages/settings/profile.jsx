import BreadcrumbUI from '@/Components/UI/BreadcrumbUI';
import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import FileUploadField from '@/Components/UI/FileUploadField';
import SubmitBtn from '@/Components/UI/SubmitBtn';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { notification } from 'antd';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: <Link href={route('dashboard')}>Dashboard</Link>,
    },
];

export default function Profile({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const [fileList, setFileList] = useState([]);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name || '',
        email: auth.user.email || '',
        phone: auth.user.phone || '',
        gender: auth.user.gender || '',
        img: null,
        _method: 'PATCH',
    });

    // Change password form
    const {
        data: passwordData,
        setData: setPasswordData,
        put: updatePassword,
        errors: passwordErrors,
        processing: passwordProcessing,
        reset: resetPassword,
        recentlySuccessful: passwordRecentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                notification.success({
                    message: 'Profile Updated',
                    description: 'Your profile has been updated successfully!',
                    placement: 'bottomRight',
                });
            },
            onError: (errors) => {
                notification.error({
                    message: 'Update Failed',
                    description: 'There was an error updating your profile. Please check the form and try again.',
                    placement: 'bottomRight',
                });
            },
        });
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        updatePassword(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                resetPassword();
                notification.success({
                    message: 'Password Changed',
                    description: 'Your password has been updated successfully!',
                    placement: 'bottomRight',
                });
            },
            onError: (errors) => {
                console.log('🚀 ~ updatePassword ~ errors:', errors);
                if (errors.password) {
                    resetPassword('password', 'password_confirmation');
                    notification.error({
                        message: 'Password Update Failed',
                        description: 'There was an error updating your password.',
                        placement: 'bottomRight',
                    });
                }
                if (errors.current_password) {
                    resetPassword('current_password');
                    notification.error({
                        message: 'Password Update Failed',
                        description: 'There was an error updating your password. Please check your current password and try again.',
                        placement: 'bottomRight',
                    });
                }
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Profile Settings" />

            <div className="space-y-6">
                <BreadcrumbUI items={breadcrumbs} />

                <div className="mx-auto max-w-4xl">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h1 className="mb-6 text-2xl font-bold text-gray-900">Profile Settings</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FieldSet label="Personal Information" labelClassName="text-lg font-semibold" hr={true}>
                                <Field label="Profile Photo" error={errors.img}>
                                    <div className="flex items-center space-x-4">
                                        <div className="h-16 w-16 overflow-hidden rounded-full">
                                            <img
                                                src={getAvatarImage(auth.user.img, 'staff_images', auth.user.name)}
                                                alt={auth.user.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <FileUploadField
                                                type="picture-card"
                                                text="Upload New Photo"
                                                fileList={fileList}
                                                onChange={({ file, fileList: newFileList }) => {
                                                    setFileList(newFileList);
                                                    if (file) {
                                                        setData('img', file);
                                                    }
                                                }}
                                                className="h-fit w-fit rounded-lg border border-gray-300 px-4 py-2 text-center"
                                                accept="image/*"
                                                maxCount={1}
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Accepted formats: JPG, PNG. Max size: 4MB</p>
                                        </div>
                                    </div>
                                </Field>

                                <Field label="Full Name" error={errors.name}>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </Field>

                                <Field label="Email Address" error={errors.email}>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </Field>

                                <Field label="Phone Number" error={errors.phone}>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                        placeholder="Enter your phone number"
                                    />
                                </Field>

                                <Field label="Gender" error={errors.gender}>
                                    <select
                                        value={data.gender}
                                        onChange={(e) => setData('gender', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </Field>
                            </FieldSet>

                            <div className="flex justify-end">
                                <SubmitBtn loadingIndicator={processing} btnText="Update Profile" className="bg-blue-600 hover:bg-blue-700" />
                            </div>
                        </form>
                    </div>

                    {/* Change Password Section */}
                    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold text-gray-900">Change Password</h2>

                        <form onSubmit={handlePasswordUpdate} className="space-y-4">
                            <Field label="Current Password" error={passwordErrors.current_password}>
                                <input
                                    type="password"
                                    value={passwordData.current_password}
                                    onChange={(e) => setPasswordData('current_password', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    placeholder="Enter your current password"
                                    required
                                />
                            </Field>

                            <Field label="New Password" error={passwordErrors.password}>
                                <input
                                    type="password"
                                    value={passwordData.password}
                                    onChange={(e) => setPasswordData('password', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    placeholder="Enter new password"
                                    required
                                />
                            </Field>

                            <Field label="Confirm New Password" error={passwordErrors.password_confirmation}>
                                <input
                                    type="password"
                                    value={passwordData.password_confirmation}
                                    onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    placeholder="Confirm new password"
                                    required
                                />
                            </Field>

                            <div className="flex justify-end">
                                <SubmitBtn loadingIndicator={passwordProcessing} btnText="Change Password" className="bg-red-600 hover:bg-red-700" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
