import React from 'react';

const DuePrintableComponent = React.forwardRef(({ filterData, data }, ref) => {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div ref={ref} className="hidden print:block">
            <div className="bg-white p-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <p className="mb-2 text-2xl font-bold">Madrasha Management System</p>
                    <h2 className="mb-2 text-xl font-semibold">Student Due List Report</h2>
                    <p className="text-gray-600">Generated on: {currentDate}</p>
                </div>

                {/* Filter Information */}
                <div className="mb-6 rounded bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Applied Filters:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <strong>Department:</strong> {filterData?.selectedDepartment || 'All Departments'}
                        </div>
                        <div>
                            <strong>Class:</strong> {filterData?.selectedClass || 'All Classes'}
                        </div>
                        <div>
                            <strong>Gender:</strong> {filterData?.selectedGender || 'All'}
                        </div>
                        <div>
                            <strong>Fee Type:</strong> {filterData?.selectedFeeType || 'All'}
                        </div>
                    </div>
                </div>

                {/* Due List Table */}
                <div className="overflow-hidden">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">SL</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Student Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Roll No</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Class</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Department</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Due Amount</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Month</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data?.length > 0 ? (
                                data?.map((student, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.unique_id}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.class}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.department}</td>
                                        <td className="border border-gray-300 px-4 py-2">৳{student.due_amount}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.month}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                                        No due records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                {data && data.length > 0 && (
                    <div className="mt-6 rounded bg-gray-50 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <strong>Total Students with Due: {data.length}</strong>
                            </div>
                            <div>
                                <strong>
                                    Total Due Amount: ৳{data.reduce((sum, student) => sum + parseFloat(student.due_amount || 0), 0).toFixed(2)}
                                </strong>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>This is a computer-generated report from Madrasha Management System</p>
                </div>
            </div>
        </div>
    );
});

DuePrintableComponent.displayName = 'DuePrintableComponent';

export default DuePrintableComponent;
