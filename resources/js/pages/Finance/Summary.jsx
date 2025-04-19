import TabBarContainer from '@/Container/Finance/TabBarContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Summary({ data }) {
    const [activeTab, setActiveTab] = useState('summary');
    const [earnings, setEarnings] = useState({
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear(),
    }); //get the current month dynamically
    const [expensesMonth, setExpensesMonth] = useState('January');
    const [expensesYear, setExpensesYear] = useState('2024');
    const [showEarningsMonthDropdown, setShowEarningsMonthDropdown] = useState(false);
    const [showEarningsYearDropdown, setShowEarningsYearDropdown] = useState(false);
    const [showExpensesMonthDropdown, setShowExpensesMonthDropdown] = useState(false);
    const [showExpensesYearDropdown, setShowExpensesYearDropdown] = useState(false);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'];

    useEffect(() => {
        router.get(route('finance.summary'), earnings, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [earnings]);

    const handleEarnings = () => {
        router.get(route('finance.summary'), earnings, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            // reset: true,
            onSuccess: (response) => {
                console.log('🚀 ~ handleEarnings ~ response:', response);
                // setEarnings({ ...earnings, month });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Finance Summary" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Navigation Tabs */}
                    <TabBarContainer activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Remaining Amount Card */}
                    <div className="mb-6 flex items-center rounded-lg bg-white p-4 shadow-sm">
                        <div>
                            <p className="font-medium text-gray-700">Remaining amount in this month:</p>
                            {/* <p className="text-xl font-medium">{data.remaining_amount.toLocaleString()} BDT</p> */}
                        </div>
                    </div>

                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Earnings Card */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-800">Total earnings</h3>
                                <div className="flex space-x-2">
                                    <div className="relative">
                                        <div
                                            className="flex cursor-pointer items-center rounded border border-gray-300 px-2 py-1 text-xs text-gray-600"
                                            onClick={() => setShowEarningsMonthDropdown(!showEarningsMonthDropdown)}
                                        >
                                            <span>{earnings.month}</span>
                                            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {showEarningsMonthDropdown && (
                                            <div className="absolute top-full left-0 z-10 mt-1 max-h-48 w-40 overflow-y-auto rounded border border-gray-300 bg-white shadow-lg">
                                                {months.map((month) => (
                                                    <div
                                                        key={month}
                                                        className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${month === earnings.month ? 'bg-gray-100' : ''}`}
                                                        onClick={() => {
                                                            setEarnings({ ...earnings, month });
                                                            setShowEarningsMonthDropdown(false);
                                                        }}
                                                    >
                                                        {month}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <div
                                            className="flex cursor-pointer items-center rounded border border-gray-300 px-2 py-1 text-xs text-gray-600"
                                            onClick={() => setShowEarningsYearDropdown(!showEarningsYearDropdown)}
                                        >
                                            <span>{earnings.year}</span>
                                            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {showEarningsYearDropdown && (
                                            <div className="absolute top-full left-0 z-10 mt-1 w-24 rounded border border-gray-300 bg-white shadow-lg">
                                                {years.map((year) => (
                                                    <div
                                                        key={year}
                                                        className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${year === earnings.year ? 'bg-gray-100' : ''}`}
                                                        onClick={() => {
                                                            setEarnings({ ...earnings, year });
                                                            setShowEarningsYearDropdown(false);
                                                        }}
                                                    >
                                                        {year}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <hr className="mb-4 border-gray-200" />

                            <div className="flex">
                                <div className="relative w-1/3">
                                    <div className="relative aspect-square">
                                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-100">
                                            <div
                                                className="h-3/4 w-3/4 rounded-full"
                                                style={{
                                                    background: 'conic-gradient(#49D946 0% 25%, #F0CA41 25% 50%, #9658ED 50% 75%, #E6583F 75% 100%)',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-2/3 space-y-2">
                                    {data?.earnings?.map((earning) => (
                                        <>
                                            <div className="p-2">
                                                <div className="flex items-center">
                                                    <div className="mr-2 h-4 w-4 rounded bg-[#49D946]" />
                                                    <span className="text-gray-600">{earning.feeType}</span>
                                                    <span className="ml-auto font-medium">{earning.amount} BDT</span>
                                                </div>
                                            </div>
                                            <hr className="border-gray-100" />
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Expenses Card */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-800">Total Expenses</h3>
                                <div className="flex space-x-2">
                                    <div className="relative">
                                        <div
                                            className="flex cursor-pointer items-center rounded border border-gray-300 px-2 py-1 text-xs text-gray-600"
                                            onClick={() => setShowExpensesMonthDropdown(!showExpensesMonthDropdown)}
                                        >
                                            <span>{expensesMonth}</span>
                                            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {showExpensesMonthDropdown && (
                                            <div className="absolute top-full left-0 z-10 mt-1 max-h-48 w-40 overflow-y-auto rounded border border-gray-300 bg-white shadow-lg">
                                                {months.map((month) => (
                                                    <div
                                                        key={month}
                                                        className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${month === expensesMonth ? 'bg-gray-100' : ''}`}
                                                        onClick={() => {
                                                            setExpensesMonth(month);
                                                            setShowExpensesMonthDropdown(false);
                                                        }}
                                                    >
                                                        {month}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <div
                                            className="flex cursor-pointer items-center rounded border border-gray-300 px-2 py-1 text-xs text-gray-600"
                                            onClick={() => setShowExpensesYearDropdown(!showExpensesYearDropdown)}
                                        >
                                            <span>{expensesYear}</span>
                                            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {showExpensesYearDropdown && (
                                            <div className="absolute top-full left-0 z-10 mt-1 w-24 rounded border border-gray-300 bg-white shadow-lg">
                                                {years.map((year) => (
                                                    <div
                                                        key={year}
                                                        className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${year === expensesYear ? 'bg-gray-100' : ''}`}
                                                        onClick={() => {
                                                            setExpensesYear(year);
                                                            setShowExpensesYearDropdown(false);
                                                        }}
                                                    >
                                                        {year}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <hr className="mb-4 border-gray-200" />

                            <div className="flex">
                                <div className="relative w-1/3">
                                    <div className="relative aspect-square">
                                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-100">
                                            <div
                                                className="h-3/4 w-3/4 rounded-full"
                                                style={{
                                                    background: 'conic-gradient(#49D946 0% 25%, #F0CA41 25% 50%, #9658ED 50% 75%, #E6583F 75% 100%)',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-2/3 space-y-2">
                                    <div className="p-2">
                                        <div className="flex items-center">
                                            <div className="mr-2 h-4 w-4 rounded bg-[#49D946]" />
                                            <span className="text-gray-600">Boarding:</span>
                                            <span className="ml-auto font-medium">{data.expenses.boarding.toLocaleString()} BDT</span>
                                        </div>
                                    </div>
                                    <hr className="border-gray-100" />

                                    <div className="p-2">
                                        <div className="flex items-center">
                                            <div className="mr-2 h-4 w-4 rounded bg-[#F0CA41]" />
                                            <span className="text-gray-600">Staff salary:</span>
                                            <span className="ml-auto font-medium">{data.expenses.staff_salary.toLocaleString()} BDT</span>
                                        </div>
                                    </div>
                                    <hr className="border-gray-100" />

                                    <div className="p-2">
                                        <div className="flex items-center">
                                            <div className="mr-2 h-4 w-4 rounded bg-[#9658ED]" />
                                            <span className="text-gray-600">Institute development:</span>
                                            <span className="ml-auto font-medium">{data.expenses.institute_development.toLocaleString()} BDT</span>
                                        </div>
                                    </div>
                                    <hr className="border-gray-100" />

                                    <div className="p-2">
                                        <div className="flex items-center">
                                            <div className="mr-2 h-4 w-4 rounded bg-[#E6583F]" />
                                            <span className="text-gray-600">Others:</span>
                                            <span className="ml-auto font-medium">{data.expenses.others.toLocaleString()} BDT</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add a click away listener to close dropdowns when clicking outside */}
                    {(showEarningsMonthDropdown || showEarningsYearDropdown || showExpensesMonthDropdown || showExpensesYearDropdown) && (
                        <div
                            className="fixed inset-0 z-0"
                            onClick={() => {
                                setShowEarningsMonthDropdown(false);
                                setShowEarningsYearDropdown(false);
                                setShowExpensesMonthDropdown(false);
                                setShowExpensesYearDropdown(false);
                            }}
                        />
                    )}

                    {/* Month Selection - This is shown in the Figma but could be implemented with a dropdown */}
                    <div className="grid hidden grid-cols-6 gap-2 rounded-lg bg-white p-4 text-center shadow-md">
                        <div className="cursor-pointer rounded px-4 py-2 text-gray-600 hover:bg-gray-100">January</div>
                        <div className="cursor-pointer rounded bg-gray-100 px-4 py-2 text-gray-800">February</div>
                        <div className="cursor-pointer rounded px-4 py-2 text-gray-600 hover:bg-gray-100">March</div>
                        <div className="cursor-pointer rounded px-4 py-2 text-gray-600 hover:bg-gray-100">April</div>
                        <div className="cursor-pointer rounded px-4 py-2 text-gray-600 hover:bg-gray-100">May</div>
                        <div className="cursor-pointer rounded px-4 py-2 text-gray-600 hover:bg-gray-100">June</div>
                        <div className="cursor-pointer rounded px-4 py-2 text-gray-600 hover:bg-gray-100">July</div>
                        <div className="cursor-pointer rounded px-4 py-2 text-gray-600 hover:bg-gray-100">August</div>
                        <div className="cursor-pointer rounded px-4 py-2 text-gray-600 hover:bg-gray-100">September</div>
                        <div className="cursor-pointer rounded px-4 py-2 text-gray-600 hover:bg-gray-100">October</div>
                        <div className="cursor-pointer rounded px-4 py-2 text-gray-600 hover:bg-gray-100">November</div>
                        <div className="cursor-pointer rounded px-4 py-2 text-gray-600 hover:bg-gray-100">December</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
