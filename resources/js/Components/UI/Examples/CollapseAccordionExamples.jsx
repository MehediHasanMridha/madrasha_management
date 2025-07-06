import { useState } from 'react';
import AccordionUI from '../AccordionUI';
import CollapseUI from '../CollapseUI';

/**
 * Example usage of CollapseUI and AccordionUI components
 * This file demonstrates various use cases and configurations
 */
const CollapseAccordionExamples = () => {
    const [activeCollapseKey, setActiveCollapseKey] = useState(['1']);
    const [activeAccordionKey, setActiveAccordionKey] = useState('1');

    // Sample data for both components
    const sampleItems = [
        {
            key: '1',
            label: 'User Management',
            children: (
                <div className="space-y-2">
                    <p>Manage user accounts, roles, and permissions.</p>
                    <ul className="ml-4 list-inside list-disc">
                        <li>Create new users</li>
                        <li>Edit existing users</li>
                        <li>Assign roles and permissions</li>
                        <li>Deactivate users</li>
                    </ul>
                </div>
            ),
        },
        {
            key: '2',
            label: 'System Settings',
            children: (
                <div className="space-y-2">
                    <p>Configure system-wide settings and preferences.</p>
                    <ul className="ml-4 list-inside list-disc">
                        <li>General settings</li>
                        <li>Security settings</li>
                        <li>Notification preferences</li>
                        <li>Integration settings</li>
                    </ul>
                </div>
            ),
        },
        {
            key: '3',
            label: 'Reports & Analytics',
            children: (
                <div className="space-y-2">
                    <p>View detailed reports and analytics.</p>
                    <ul className="ml-4 list-inside list-disc">
                        <li>User activity reports</li>
                        <li>System performance metrics</li>
                        <li>Custom report generation</li>
                        <li>Data export options</li>
                    </ul>
                </div>
            ),
        },
    ];

    const handleCollapseChange = (key) => {
        setActiveCollapseKey(key);
        console.log('Collapse changed:', key);
    };

    const handleAccordionChange = (key) => {
        setActiveAccordionKey(key);
        console.log('Accordion changed:', key);
    };

    return (
        <div className="min-h-screen space-y-8 bg-gray-50 p-6">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-8 text-3xl font-bold text-gray-900">Collapse & Accordion Examples</h1>

                {/* Basic CollapseUI Example */}
                <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Basic CollapseUI (Multiple panels can be open)</h2>
                    <CollapseUI items={sampleItems} defaultActiveKey={['1']} onChange={handleCollapseChange} className="mb-4" />
                </section>

                {/* Basic AccordionUI Example */}
                <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Basic AccordionUI (Only one panel can be open)</h2>
                    <AccordionUI items={sampleItems} defaultActiveKey="1" onChange={handleAccordionChange} className="mb-4" />
                </section>

                {/* Controlled CollapseUI Example */}
                <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Controlled CollapseUI</h2>
                    <div className="mb-4">
                        <p className="mb-2 text-sm text-gray-600">Active keys: {JSON.stringify(activeCollapseKey)}</p>
                        <button
                            onClick={() => setActiveCollapseKey(['1', '2'])}
                            className="mr-2 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                        >
                            Open Panels 1 & 2
                        </button>
                        <button
                            onClick={() => setActiveCollapseKey([])}
                            className="rounded bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
                        >
                            Close All
                        </button>
                    </div>
                    <CollapseUI items={sampleItems} activeKey={activeCollapseKey} onChange={handleCollapseChange} className="mb-4" />
                </section>

                {/* Controlled AccordionUI Example */}
                <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Controlled AccordionUI</h2>
                    <div className="mb-4">
                        <p className="mb-2 text-sm text-gray-600">Active key: {activeAccordionKey}</p>
                        <button
                            onClick={() => setActiveAccordionKey('1')}
                            className="mr-2 rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
                        >
                            Open Panel 1
                        </button>
                        <button
                            onClick={() => setActiveAccordionKey('2')}
                            className="mr-2 rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
                        >
                            Open Panel 2
                        </button>
                        <button
                            onClick={() => setActiveAccordionKey(null)}
                            className="rounded bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
                        >
                            Close All
                        </button>
                    </div>
                    <AccordionUI items={sampleItems} activeKey={activeAccordionKey} onChange={handleAccordionChange} className="mb-4" />
                </section>

                {/* Different Variants */}
                <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">AccordionUI Variants</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-2 text-lg font-medium text-gray-700">Default Variant</h3>
                            <AccordionUI items={sampleItems} variant="default" className="mb-4" />
                        </div>

                        <div>
                            <h3 className="mb-2 text-lg font-medium text-gray-700">Filled Variant</h3>
                            <AccordionUI items={sampleItems} variant="filled" className="mb-4" />
                        </div>

                        <div>
                            <h3 className="mb-2 text-lg font-medium text-gray-700">Borderless Variant</h3>
                            <AccordionUI items={sampleItems} variant="borderless" className="mb-4" />
                        </div>
                    </div>
                </section>

                {/* Different Sizes */}
                <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Different Sizes</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-2 text-lg font-medium text-gray-700">Small Size</h3>
                            <CollapseUI items={sampleItems} size="small" className="mb-4" />
                        </div>

                        <div>
                            <h3 className="mb-2 text-lg font-medium text-gray-700">Large Size</h3>
                            <CollapseUI items={sampleItems} size="large" className="mb-4" />
                        </div>
                    </div>
                </section>

                {/* Ghost and Borderless */}
                <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Ghost and Borderless Styles</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-2 text-lg font-medium text-gray-700">Ghost Style</h3>
                            <CollapseUI items={sampleItems} ghost={true} className="mb-4" />
                        </div>

                        <div>
                            <h3 className="mb-2 text-lg font-medium text-gray-700">Borderless</h3>
                            <CollapseUI items={sampleItems} bordered={false} className="mb-4" />
                        </div>
                    </div>
                </section>

                {/* Custom Theme Example */}
                <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Custom Theme Example</h2>
                    <AccordionUI
                        items={sampleItems}
                        themeToken={{
                            borderRadiusLG: 12,
                            colorBorder: '#e74c3c',
                            colorFillAlter: '#fef2f2',
                        }}
                        themeComponents={{
                            Collapse: {
                                headerBg: '#fef2f2',
                                contentBg: '#ffffff',
                                headerPadding: '20px 24px',
                                contentPadding: '20px 24px',
                            },
                        }}
                        className="mb-4"
                    />
                </section>
            </div>
        </div>
    );
};

export default CollapseAccordionExamples;
