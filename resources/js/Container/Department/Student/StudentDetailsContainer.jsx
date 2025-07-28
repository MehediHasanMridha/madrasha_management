import { Card, CardContent } from '@/Components/UI/card';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { router } from '@inertiajs/react';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import StudentMonthlyFeeTableListContainer from './StudentMonthlyFeeTableListContainer';
import StudentTransactionsTableListContainer from './StudentTransactionsTableListContainer';

const StudentDetailsContainer = ({ student, department }) => {
    // Sample student data
    const personalInfo = [
        { label: 'Phone number', value: student?.phone || 'N/A' },
        { label: "Father's name", value: student?.guardian?.father_name },
        { label: 'Address', value: student?.address?.district + ', ' + student?.address?.upazilla + ', ' + student?.address?.location },
        { label: 'Blood group', value: student?.blood || 'N/A' },
        { label: 'class', value: student?.academic?.class || 'N/A' },
        { label: 'Boarding fee', value: student?.academic?.boarding_fee },
        { label: 'Academic fee', value: student?.academic?.academic_fee },
        { label: 'Guardian Mobile-1', value: student?.guardian?.phone?.[0] || 'N/A' },
        { label: 'Guardian Mobile-2', value: student?.guardian?.phone?.[1] || 'N/A' },
        { label: 'Reference', value: student?.academic?.reference || 'N/A' },
    ];
    const totalPayableAmount = Number(student?.academic?.academic_fee) + Number(student?.academic?.boarding_fee);
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [copied, setCopied] = useState(false);

    const student_transactions = student?.student_transactions_history || [];

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
            route('department.student_details', { department_slug: department?.slug, student_id: student?.unique_id }),
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
                    {/* Student Profile Header */}
                    <div className="mb-14 flex flex-col items-center gap-6">
                        <div className="h-[200px] w-[200px] overflow-hidden rounded-full bg-gray-100">
                            <img
                                src={getAvatarImage(student?.image, 'student_images', student?.name)}
                                alt={student?.name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <h2 className="text-center text-2xl font-medium text-gray-900">{student?.name}</h2>

                            <div className="flex items-center gap-4">
                                <span className="rounded-full border border-green-200 bg-green-50 px-4 py-1 text-sm text-green-600">
                                    {student?.status === 'active' ? 'Active student' : 'Inactive student'}
                                </span>

                                <div className="flex items-center gap-2 rounded bg-gray-50 px-3 py-1 text-sm text-gray-600">
                                    <span>ID: {student?.unique_id}</span>
                                    <Copy
                                        size={16}
                                        className="cursor-pointer text-gray-400 hover:text-gray-600"
                                        onClick={() => copyToClipboard(student?.unique_id)}
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

            {/* Right Column - Academic Transactions */}
            <div className="w-[70%]">
                <Card className="h-full border-none shadow-none">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <h3 className="text-base font-medium text-gray-900">Academic transactions</h3>
                            <hr className="border-gray-200" />

                            {/* Summary and Year Selector */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Total payable amount/Month</span>
                                    <span className="text-sm text-gray-500">:</span>
                                    <span className="text-sm font-medium text-gray-700">{totalPayableAmount.toLocaleString('en-US')} BDT</span>
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

                            {/* Transactions Table */}
                            <StudentMonthlyFeeTableListContainer
                                data={student?.monthly_fee_history}
                                academicFee={student?.academic?.academic_fee}
                                boardingFee={student?.academic?.boarding_fee}
                                student={student}
                                year={year}
                            />
                        </div>
                    </CardContent>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <h3 className="text-base font-medium text-gray-900">Academic transactions</h3>
                            {/* Transactions Table */}
                            <StudentTransactionsTableListContainer
                                data={student?.student_transactions_history || []}
                                department={department}
                                student={student}
                                academicFee={student?.academic?.academic_fee}
                                boardingFee={student?.academic?.boarding_fee}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StudentDetailsContainer;
