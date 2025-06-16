import { Button } from '@/Components/UI/button';
import { Card, CardContent } from '@/Components/UI/card';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { cn } from '@/lib/utils';
import { ChevronDown, Copy } from 'lucide-react';

const StudentDetailsContainer = ({ student }) => {
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

    const academicTransactions = [
        { month: 'January', boardingFee: '2,000', academicFee: '1,000', due: '00', status: 'Paid', statusColor: 'text-green-600' },
        { month: 'February', boardingFee: '2,000', academicFee: '1,000', due: '00', status: 'Paid', statusColor: 'text-green-600' },
        { month: 'March', boardingFee: '2,000', academicFee: '1,000', due: '00', status: 'Paid', statusColor: 'text-green-600' },
        { month: 'April', boardingFee: '2,000', academicFee: '1,000', due: '00', status: 'Paid', statusColor: 'text-green-600' },
        {
            month: 'May',
            boardingFee: '1,000',
            academicFee: '1,000',
            due: '1,000',
            status: 'Pay due',
            statusColor: 'text-red-600',
            hasPayButton: true,
        },
        { month: 'June', boardingFee: '2,000', academicFee: '1,000', due: '3,000', status: 'Not paid', statusColor: 'text-gray-600' },
        { month: 'July', boardingFee: '2,000', academicFee: '1,000', due: '3,000', status: 'Not paid', statusColor: 'text-gray-600' },
        { month: 'August', boardingFee: '2,000', academicFee: '1,000', due: '3,000', status: 'Not paid', statusColor: 'text-gray-600' },
        { month: 'September', boardingFee: '2,000', academicFee: '1,000', due: '3,000', status: 'Not paid', statusColor: 'text-gray-600' },
        { month: 'October', boardingFee: '2,000', academicFee: '1,000', due: '3,000', status: 'Not paid', statusColor: 'text-gray-600' },
        { month: 'November', boardingFee: '2,000', academicFee: '1,000', due: '3,000', status: 'Not paid', statusColor: 'text-gray-600' },
        { month: 'December', boardingFee: '2,000', academicFee: '1,000', due: '3,000', status: 'Not paid', statusColor: 'text-gray-600' },
    ];

    return (
        <div className="mb-6 flex justify-center gap-6">
            {/* Left Column - Personal Information */}
            <Card className="w-fit max-w-md border-none shadow-none">
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
                                    <Copy size={16} className="cursor-pointer text-gray-400 hover:text-gray-600" />
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
            <div className="w-full max-w-5xl">
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
                                    <span className="text-sm font-medium text-gray-700">4,000 BDT</span>
                                </div>

                                <div className="flex items-center gap-2 rounded border border-gray-200 px-3 py-2 text-sm text-gray-700">
                                    <span>2024</span>
                                    <ChevronDown size={16} className="text-gray-400" />
                                </div>
                            </div>

                            {/* Transactions Table */}
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                {/* Table Header */}
                                <div className="grid grid-cols-5 border-b border-gray-200 bg-gray-50">
                                    <div className="border-r border-gray-200 p-3 text-sm font-normal text-gray-900">Month</div>
                                    <div className="border-r border-gray-200 p-3 text-sm font-normal text-gray-900">Boarding fee</div>
                                    <div className="border-r border-gray-200 p-3 text-sm font-normal text-gray-900">Academic fee</div>
                                    <div className="border-r border-gray-200 p-3 text-sm font-normal text-gray-900">Due</div>
                                    <div className="p-3 text-sm font-normal text-gray-900">Status</div>
                                </div>

                                {/* Table Body */}
                                {academicTransactions.map((transaction, index) => (
                                    <div
                                        key={index}
                                        className={cn('grid grid-cols-5', index < academicTransactions.length - 1 && 'border-b border-gray-200')}
                                    >
                                        <div className="border-r border-gray-200 p-3 text-sm text-gray-700">{transaction.month}</div>
                                        <div
                                            className={cn(
                                                'border-r border-gray-200 p-3 text-right text-sm',
                                                transaction.status === 'Paid' ? 'text-green-600' : 'text-gray-700',
                                            )}
                                        >
                                            {transaction.boardingFee}
                                        </div>
                                        <div
                                            className={cn(
                                                'border-r border-gray-200 p-3 text-right text-sm',
                                                transaction.status === 'Paid' ? 'text-green-600' : 'text-gray-700',
                                            )}
                                        >
                                            {transaction.academicFee}
                                        </div>
                                        <div
                                            className={cn(
                                                'border-r border-gray-200 p-3 text-right text-sm',
                                                transaction.due === '00' ? 'text-green-600' : 'text-red-600',
                                            )}
                                        >
                                            {transaction.due}
                                        </div>
                                        <div className="p-3 text-center">
                                            {transaction.hasPayButton ? (
                                                <Button className="flex h-auto items-center gap-2 bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                                                    <span>Pay due</span>
                                                    <svg width="5" height="10" viewBox="0 0 5 10" fill="none" className="text-white">
                                                        <path d="M0 8.5L3.5 5L0 1.5L1 0.5L5.5 5L1 9.5L0 8.5Z" fill="currentColor" />
                                                    </svg>
                                                </Button>
                                            ) : (
                                                <span className={cn('text-sm', transaction.statusColor)}>{transaction.status}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StudentDetailsContainer;
