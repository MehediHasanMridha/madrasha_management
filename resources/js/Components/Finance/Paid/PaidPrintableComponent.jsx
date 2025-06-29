import React from 'react';

const PaidPrintableComponent = React.forwardRef(({ selectedFilters, data, filter }, ref) => {
    const currentDate = new Date().toLocaleDateString();
    const filterLabel = filter?.filter === 'this_month' ? 'This Month' : 'Today';

    return (
        <div ref={ref} className="hidden print:block">
            <div className="bg-white">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mb-2 text-2xl font-bold">Madrasha Management System</div>
                    <div className="mb-2 text-xl font-semibold">Student Paid List Report</div>
                    <div className="text-gray-600">Generated on: {currentDate}</div>
                </div>

                {/* Filter Information */}
                <div className="mb-6 rounded bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Applied Filters:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium">Filter Type:</span> {filterLabel}
                        </div>
                        <div>
                            <span className="font-medium">Department:</span> {selectedFilters?.department || 'All Departments'}
                        </div>
                        <div>
                            <span className="font-medium">Class:</span> {selectedFilters?.class || 'All Classes'}
                        </div>
                        <div>
                            <span className="font-medium">Gender:</span> {selectedFilters?.gender || 'All'}
                        </div>
                    </div>
                </div>

                {/* Paid List Table */}
                <div className="overflow-hidden">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <td className="border border-gray-300 px-3 py-2 text-center font-semibold">SL</td>
                                <td className="border border-gray-300 px-3 py-2 font-semibold">Student Name</td>
                                <td className="border border-gray-300 px-3 py-2 font-semibold">Student ID</td>
                                <td className="border border-gray-300 px-3 py-2 font-semibold">Class</td>
                                <td className="border border-gray-300 px-3 py-2 font-semibold">Department</td>
                                <td className="border border-gray-300 px-3 py-2 font-semibold">Total Paid</td>
                                <td className="border border-gray-300 px-3 py-2 font-semibold">Payment Count</td>
                                <td className="border border-gray-300 px-3 py-2 font-semibold">Payment Details</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data?.length > 0 ? (
                                data?.map((student, index) => (
                                    <tr key={student.id}>
                                        <td className="border border-gray-300 px-3 py-2 text-center">{index + 1}</td>
                                        <td className="border border-gray-300 px-3 py-2">{student.name}</td>
                                        <td className="border border-gray-300 px-3 py-2">{student.unique_id}</td>
                                        <td className="border border-gray-300 px-3 py-2">{student.class}</td>
                                        <td className="border border-gray-300 px-3 py-2">{student.department}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-right">
                                            ৳{parseFloat(student.total_paid).toLocaleString()}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2 text-center">{student.payment_count}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-xs">
                                            {student.payments?.map((payment, idx) => (
                                                <div key={idx} className="mb-1">
                                                    <span className="font-medium">{payment.fee_type}:</span> ৳{payment.amount}
                                                    <br />
                                                    <span className="text-gray-600">{new Date(payment.created_at).toLocaleDateString()}</span>
                                                    {idx < student.payments.length - 1 && <hr className="my-1" />}
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="border border-gray-300 px-3 py-8 text-center text-gray-500">
                                        No paid students found for the selected criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="mt-6 rounded bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Summary:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium">Total Students:</span> {data?.length || 0}
                        </div>
                        <div>
                            <span className="font-medium">Total Amount Paid:</span> ৳
                            {data?.reduce((sum, student) => sum + parseFloat(student.total_paid || 0), 0).toLocaleString() || 0}
                        </div>
                        <div>
                            <span className="font-medium">Total Payments:</span>
                            {data?.reduce((sum, student) => sum + (student.payment_count || 0), 0) || 0}
                        </div>
                        <div>
                            <span className="font-medium">Filter Period:</span> {filterLabel}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 border-t pt-4 text-center text-xs text-gray-500">
                    <p>This report was generated automatically by Madrasha Management System</p>
                    <p>Print Date: {currentDate}</p>
                </div>
            </div>
        </div>
    );
});

PaidPrintableComponent.displayName = 'PaidPrintableComponent';

export default PaidPrintableComponent;
