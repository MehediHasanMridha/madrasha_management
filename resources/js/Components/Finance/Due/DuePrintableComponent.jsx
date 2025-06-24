import React from 'react';

const DuePrintableComponent = React.forwardRef(({ selectedFilters, data }, ref) => {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div ref={ref} className="hidden print:block">
            <div className="bg-white">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mb-2 text-2xl font-bold">Madrasha Management System</div>
                    <div className="mb-2 text-xl font-semibold">Student Due List Report</div>
                    <div className="text-gray-600">Generated on: {currentDate}</div>
                </div>

                {/* Filter Information */}
                <div className="mb-6 rounded bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Applied Filters:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span>Department:</span> {selectedFilters?.department || 'All Departments'}
                        </div>
                        <div>
                            <span>Class:</span> {selectedFilters?.class || 'All Classes'}
                        </div>
                        <div>
                            <span>Gender:</span> {selectedFilters?.gender || 'All'}
                        </div>
                        {/* <div>
                            <span>Fee Type:</span> {filter?.selectedFeeType || 'All'}
                        </div> */}
                    </div>
                </div>

                {/* Due List Table */}
                <div className="overflow-hidden">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <td className="px-4 py-2">SL</td>
                                <td className="border border-gray-300 px-4 py-2">Student Name</td>
                                <td className="border border-gray-300 px-4 py-2">Roll No</td>
                                <td className="border border-gray-300 px-4 py-2">Class</td>
                                <td className="border border-gray-300 px-4 py-2">Department</td>
                                <td className="border border-gray-300 px-4 py-2">Due Amount</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data?.length > 0 ? (
                                data?.map((student, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                        <td className="border border-gray-300 px-2 py-2">{student.name}</td>
                                        <td className="w-[100px] border border-gray-300 px-2 py-2">{student.unique_id}</td>
                                        <td className="border border-gray-300 px-2 py-2">{student.class}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.department}</td>
                                        <td className="border border-gray-300 px-4 py-2">৳{student.due_amount}</td>
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
