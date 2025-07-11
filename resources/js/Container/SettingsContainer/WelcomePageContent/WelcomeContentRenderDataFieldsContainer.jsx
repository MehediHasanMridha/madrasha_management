import Field from '@/Components/UI/Field';
import FieldSet from '@/Components/UI/FieldSet';

const WelcomeContentRenderDataFieldsContainer = ({ sectionKey, handleDataChange, watch }) => {
    const currentData = watch('data') || {};

    switch (sectionKey) {
        case 'hero':
            return (
                <FieldSet label={'Hero Section Data'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field label={'Subtitle'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Subtitle"
                            value={currentData.subtitle || ''}
                            onChange={(e) => handleDataChange('subtitle', e.target.value)}
                        />
                    </Field>
                    <Field label={'Image URL'}>
                        <input
                            type="text"
                            className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            placeholder="Enter Image URL"
                            value={currentData.image || ''}
                            onChange={(e) => handleDataChange('image', e.target.value)}
                        />
                    </Field>
                </FieldSet>
            );

        case 'notice':
            return (
                <FieldSet label={'Notice Section Data'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field label={'Background Color'}>
                        <input
                            type="color"
                            className="h-[48px] rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            value={currentData.backgroundColor || '#2563eb'}
                            onChange={(e) => handleDataChange('backgroundColor', e.target.value)}
                        />
                    </Field>
                    <Field label={'Enable Scrolling'}>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="scrolling"
                                checked={currentData.scrolling || false}
                                onChange={(e) => handleDataChange('scrolling', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="scrolling" className="ml-2 text-sm text-gray-900">
                                Enable scrolling animation
                            </label>
                        </div>
                    </Field>
                </FieldSet>
            );

        case 'stats':
            return (
                <FieldSet label={'Statistics Section Data'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field label={'Statistics (JSON format)'} className="md:col-span-2">
                        <textarea
                            value={JSON.stringify(currentData.stats || [], null, 2)}
                            onChange={(e) => {
                                try {
                                    const stats = JSON.parse(e.target.value);
                                    handleDataChange('stats', stats);
                                } catch (err) {
                                    // Invalid JSON, ignore
                                }
                            }}
                            rows={8}
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] font-mono text-sm focus:outline-0"
                            placeholder='[{"label": "Label", "value": "Value"}]'
                        />
                    </Field>
                </FieldSet>
            );

        case 'curriculum':
            return (
                <FieldSet label={'Curriculum Section Data'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field label={'Curriculum Pillars (JSON format)'} className="md:col-span-2">
                        <textarea
                            value={JSON.stringify(currentData.pillars || [], null, 2)}
                            onChange={(e) => {
                                try {
                                    const pillars = JSON.parse(e.target.value);
                                    handleDataChange('pillars', pillars);
                                } catch (err) {
                                    // Invalid JSON, ignore
                                }
                            }}
                            rows={12}
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] font-mono text-sm focus:outline-0"
                            placeholder='[{"title": "Title", "description": "Description", "icon": "icon_name", "color": "color"}]'
                        />
                    </Field>
                </FieldSet>
            );

        default:
            return (
                <FieldSet label={'Additional Data'} labelClassName="text-[16px] font-bold" hr={true}>
                    <Field label={'Additional Data (JSON format)'} className="md:col-span-2">
                        <textarea
                            value={JSON.stringify(currentData, null, 2)}
                            onChange={(e) => {
                                try {
                                    const data = JSON.parse(e.target.value);
                                    setValue('data', data);
                                } catch (err) {
                                    // Invalid JSON, ignore
                                }
                            }}
                            rows={6}
                            className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] font-mono text-sm focus:outline-0"
                            placeholder="{}"
                        />
                    </Field>
                </FieldSet>
            );
    }
};

export default WelcomeContentRenderDataFieldsContainer;
