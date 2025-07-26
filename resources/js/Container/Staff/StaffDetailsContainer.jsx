import { Card, CardContent } from '@/Components/UI/card';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { router } from '@inertiajs/react';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import StaffMonthlySalaryTableContainer from './StaffMonthlySalaryTableContainer';
import StaffSalaryTransactionsTableContainer from './StaffSalaryTransactionsTableContainer';

const StaffDetailsContainer = ({ staff }) => {
    // Debug: Log the staff object to see its structure

    const personalInfo = [
        { label: 'Phone number', value: staff?.phone || 'N/A' },
        { label: "Father's name", value: staff?.guardian?.father_name || 'N/A' },
        { label: "Mother's name", value: staff?.guardian?.mother_name || 'N/A' },
        {
            label: 'Address',
            value:
                `${staff?.address?.district || ''}, ${staff?.address?.upazilla || ''}, ${staff?.address?.location || ''}`.replace(
                    /^,\s*|,\s*$/g,
                    '',
                ) || 'N/A',
        },
        { label: 'Blood group', value: staff?.blood_group || 'N/A' },
        { label: 'Gender', value: staff?.gender || 'N/A' },
        { label: 'Designation', value: staff?.designation || 'N/A' },
        { label: 'Monthly Salary', value: staff?.salary ? `${staff.salary.toLocaleString('en-US')} BDT` : 'N/A' },
        { label: 'Guardian Contact', value: staff?.guardian?.contact_number || 'N/A' },
        { label: 'Reference', value: staff?.reference || 'N/A' },
        { label: 'Reference Mobile', value: staff?.reference_mobile_number || 'N/A' },
    ];

    const [copied, setCopied] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear().toString());

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getData = (year) => {
        router.get(
            route('staff.details', { staff_id: staff?.unique_id }),
            { year },
            {
                preserveState: true,
            },
        );
    };

    return (
        <div className="mb-6 flex justify-center gap-6">
            {/* Left Column - Personal Information */}
            <Card className="w-[30%] border-none shadow-none">
                <CardContent className="p-8">
                    {/* Staff Profile Header */}
                    <div className="mb-14 flex flex-col items-center gap-6">
                        <div className="h-[200px] w-[200px] overflow-hidden rounded-full bg-gray-100">
                            <img
                                src={getAvatarImage(staff?.image, 'staff_images', staff?.name)}
                                alt={staff?.name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <h2 className="text-center text-2xl font-medium text-gray-900">{staff?.name}</h2>

                            <div className="flex items-center gap-4">
                                <span className="rounded-full border border-green-200 bg-green-50 px-4 py-1 text-sm text-green-600">
                                    {staff?.status === 'active' ? 'Active staff' : 'Inactive staff'}
                                </span>

                                <div className="flex items-center gap-2 rounded bg-gray-50 px-3 py-1 text-sm text-gray-600">
                                    <span>ID: {staff?.unique_id}</span>
                                    <Copy
                                        size={16}
                                        className="cursor-pointer text-gray-400 hover:text-gray-600"
                                        onClick={() => copyToClipboard(staff?.unique_id)}
                                        title={copied ? 'Copied!' : 'Copy ID'}
                                    />
                                    {copied && <span className="ml-1 text-xs text-green-600">Copied!</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-base font-medium text-gray-900">Personal Information</h3>
                        <hr className="border-gray-200" />

                        <div className="space-y-4">
                            {personalInfo.map((info, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <span className="w-[130px] flex-shrink-0 text-sm text-gray-500">{info.label}</span>
                                    <span className="text-sm text-gray-500">:</span>
                                    <span className="flex-1 text-sm text-gray-700">{info.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Right Column - Salary Transactions */}
            <div className="w-[70%]">
                <Card className="h-full border-none shadow-none">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <h3 className="text-base font-medium text-gray-900">Salary Overview</h3>
                            <hr className="border-gray-200" />

                            {/* Summary and Year Selector */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Monthly Salary</span>
                                    <span className="text-sm text-gray-500">:</span>
                                    <span className="text-sm font-medium text-gray-700">
                                        {staff?.salary ? `${staff.salary.toLocaleString('en-US')} BDT` : 'N/A'}
                                    </span>
                                </div>

                                <select
                                    className="w-[78px] cursor-pointer rounded-[4px] border-[1px] border-[#AFAFAF] px-[8px] py-[4px] text-black focus:outline-0"
                                    value={year}
                                    onChange={(e) => {
                                        setYear(e.target.value);
                                        getData(e.target.value);
                                    }}
                                >
                                    <option disabled>Year</option>
                                    {['2025', '2026', '2027', '2028', '2029', '2030'].map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Monthly Salary Table */}
                            <StaffMonthlySalaryTableContainer data={staff?.monthly_salary_history} salary={staff?.salary} staff={staff} year={year} />
                        </div>
                    </CardContent>

                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <h3 className="text-base font-medium text-gray-900">Salary Transaction History</h3>
                            <hr className="border-gray-200" />

                            {/* Summary and Year Selector */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Transaction Year</span>
                                </div>

                                <select
                                    className="w-[78px] cursor-pointer rounded-[4px] border-[1px] border-[#AFAFAF] px-[8px] py-[4px] text-black focus:outline-0"
                                    value={year}
                                    onChange={(e) => {
                                        setYear(e.target.value);
                                        getData(e.target.value);
                                    }}
                                >
                                    <option disabled>Year</option>
                                    {['2025', '2026', '2027', '2028', '2029', '2030'].map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Salary Transactions Table */}
                            <StaffSalaryTransactionsTableContainer data={staff?.salary_transactions_history || []} staff={staff} year={year} />
                        </div>
                    </CardContent>

                    {/* Professional Information */}
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <h3 className="text-base font-medium text-gray-900">Professional Information</h3>
                            <hr className="border-gray-200" />

                            {/* Professional Details */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-sm font-medium text-gray-900">Designation</span>
                                        <p className="text-sm text-gray-600">{staff?.designation || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-900">Monthly Salary</span>
                                        <p className="text-sm text-gray-600">
                                            {staff?.salary ? `${staff.salary.toLocaleString('en-US')} BDT` : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-sm font-medium text-gray-900">Staff ID</span>
                                        <p className="text-sm text-gray-600">{staff?.unique_id}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-900">Status</span>
                                        <p className="text-sm text-gray-600">{staff?.status === 'active' ? 'Active' : 'Inactive'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Assigned Departments */}
                            {staff?.departments && Array.isArray(staff.departments) && staff.departments.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="mb-3 text-sm font-medium text-gray-900">Assigned Departments</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {staff.departments.map((dept, index) => (
                                            <div key={dept?.id || index} className="flex items-center gap-2 rounded bg-blue-50 px-3 py-2">
                                                <span className="text-sm font-medium text-blue-900">{dept?.name || 'Unknown Department'}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Reference Information */}
                            {(staff?.reference || staff?.reference_mobile_number) && (
                                <div className="mt-6">
                                    <h4 className="mb-3 text-sm font-medium text-gray-900">Reference Information</h4>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <span className="text-xs text-gray-500">Reference Name</span>
                                            <p className="text-sm text-gray-700">{staff?.reference || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500">Reference Mobile</span>
                                            <p className="text-sm text-gray-700">{staff?.reference_mobile_number || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StaffDetailsContainer;
