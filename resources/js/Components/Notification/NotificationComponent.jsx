import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import StaticBtn from '@/Components/UI/StaticBtn';
import { Bell, Send } from 'lucide-react';
import NotificationTabBarComponent from './NotificationTabBarComponent';

const NotificationComponent = ({
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
    handleClear,
    register,
    watchedTitle,
    watchedMessage,
    onSubmit,
}) => {
    return (
        <>
            <NotificationTabBarComponent tab="notification" />

            <div className="mt-[8px] flex w-full flex-col space-y-5 rounded-[8px] bg-white p-[24px]">
                <FieldSet className="lg:grid-cols-1">
                    <Field label="Notification Title" error={errors.title} labelClassName="text-sm font-medium text-gray-700">
                        <input
                            {...register('title', { required: 'Title is required' })}
                            type="text"
                            name="title"
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter notification title..."
                        />
                    </Field>

                    <Field label="Notification Message" error={errors.body} labelClassName="text-sm font-medium text-gray-700">
                        <>
                            <textarea
                                {...register('body', { required: 'Message is required' })}
                                rows={6}
                                className="w-full resize-none rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter your notification message here..."
                            />
                            <div className="mt-1 text-xs text-gray-500">{watchedMessage.length}/500 characters</div>
                        </>
                    </Field>
                </FieldSet>

                {/* Preview Section */}
                {(watchedTitle || watchedMessage) && (
                    <div className="rounded-[8px] border border-gray-200 bg-gray-50 p-4">
                        <h3 className="mb-3 text-sm font-medium text-gray-700">Preview</h3>
                        <div className="rounded-[8px] border border-gray-200 bg-white p-4">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <Bell className="h-5 w-5 text-[#4891FF]" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">{watchedTitle || 'Notification Title'}</h4>
                                    <p className="mt-1 text-sm text-gray-600">{watchedMessage || 'Notification message will appear here...'}</p>
                                    <p className="mt-2 text-xs text-gray-400">Just now</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                    <StaticBtn
                        type="button"
                        onClick={handleClear}
                        disabled={isLoading}
                        className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    >
                        Clear
                    </StaticBtn>
                    <StaticBtn onClick={handleSubmit(onSubmit)} className="w-fit bg-[#4891FF] text-white hover:bg-[#3a7ce0]">
                        {isLoading ? (
                            <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Notification
                            </>
                        )}
                    </StaticBtn>
                </div>
            </div>
        </>
    );
};

export default NotificationComponent;
