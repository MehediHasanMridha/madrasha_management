import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';
import ModalUI from '@/Components/UI/ModalUI';

const ViewWelcomePageContentContainer = ({ isModalOpen, onClose, content, title = 'View Content?' }) => {
    const renderPreview = () => {
        switch (content?.section_key) {
            case 'hero':
                return (
                    <div className="rounded-lg bg-gray-50 p-6">
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div className="flex-1">
                                <h1 className="mb-4 text-3xl font-semibold text-gray-900">{content?.content || content?.title}</h1>
                                {content?.data?.subtitle && <p className="text-gray-600">{content?.data.subtitle}</p>}
                            </div>
                            {content?.data?.image && (
                                <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-200 lg:w-64">
                                    <span className="text-gray-500">Hero Image</span>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'notice':
                return (
                    <div className="rounded-lg p-4 text-white" style={{ backgroundColor: content?.data?.backgroundColor || '#2563eb' }}>
                        <div className={content?.data?.scrolling ? 'animate-pulse' : ''}>{content?.content}</div>
                    </div>
                );

            case 'stats':
                return (
                    <div className="rounded-lg bg-gray-100 p-6">
                        <h3 className="mb-4 text-lg font-medium">{content?.title}</h3>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {content?.data?.stats?.map((stat, index) => (
                                <div key={index} className="border-l border-gray-300 pl-3">
                                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'curriculum':
                return (
                    <div className="space-y-6">
                        <h3 className="text-center text-xl font-semibold">{content?.content}</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {content?.data?.pillars?.map((pillar, index) => (
                                <div key={index} className={`rounded-lg p-4 bg-${pillar.color}-50`}>
                                    <h4 className="mb-2 font-medium text-gray-900">{pillar.title}</h4>
                                    <p className="text-sm text-gray-600">{pillar.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-900">Content?:</h4>
                            <p className="text-gray-600">{content?.content || 'No content?'}</p>
                        </div>
                        {content?.data && Object.keys(content?.data).length > 0 && (
                            <div>
                                <h4 className="font-medium text-gray-900">Data:</h4>
                                <pre className="overflow-auto rounded-md bg-gray-100 p-3 text-sm text-gray-600">
                                    {JSON.stringify(content?.data, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                );
        }
    };

    return (
        <ModalUI isModalOpen={isModalOpen} handleCancel={onClose} width={'80%'} title={title}>
            <div className="max-h-[70vh] overflow-y-auto">
                <FieldSet label={`Preview: ${content?.title || content?.section_key}`} labelClassName="text-[16px] font-bold" hr={true}>
                    <div className="md:col-span-2">
                        <div className="mb-2 text-sm text-gray-500">
                            Section Key: <span className="font-medium">{content?.section_key}</span>
                        </div>
                        <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">{renderPreview()}</div>
                    </div>
                </FieldSet>

                {/* Content Details Section */}
                <FieldSet label="Content Details" labelClassName="text-[16px] font-bold" hr={true}>
                    <Field label={'Title'}>
                        <div className="rounded-[8px] border-[1px] border-[#AFAFAF] bg-gray-50 px-[16px] py-[12px]">
                            {content?.title || 'No title'}
                        </div>
                    </Field>

                    <Field label={'Content?'} className="md:col-span-2">
                        <div className="min-h-[100px] rounded-[8px] border-[1px] border-[#AFAFAF] bg-gray-50 px-[16px] py-[12px] whitespace-pre-wrap">
                            {content?.content || 'No content?'}
                        </div>
                    </Field>

                    <Field label={'Status'}>
                        <div className="flex items-center">
                            <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    content?.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}
                            >
                                {content?.is_active ? 'Active' : 'Inactive'}
                            </span>
                            <span className="ml-2 text-sm text-gray-500">
                                {content?.is_active ? 'Visible on welcome page' : 'Hidden from welcome page'}
                            </span>
                        </div>
                    </Field>

                    {content?.data && Object.keys(content?.data).length > 0 && (
                        <Field label={'Additional Data'} className="md:col-span-2">
                            <div className="rounded-[8px] border-[1px] border-[#AFAFAF] bg-gray-50 px-[16px] py-[12px]">
                                <pre className="overflow-auto text-sm whitespace-pre-wrap text-gray-600">
                                    {JSON.stringify(content?.data, null, 2)}
                                </pre>
                            </div>
                        </Field>
                    )}
                </FieldSet>
            </div>
        </ModalUI>
    );
};

export default ViewWelcomePageContentContainer;
