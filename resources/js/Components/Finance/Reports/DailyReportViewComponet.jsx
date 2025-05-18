import LoadingUI from '@/Components/UI/LoadingUI';
import ModalUI from '@/Components/UI/ModalUI';
import { forwardRef } from 'react';

const DailyReportViewComponent = forwardRef(({ reportViewModal, setReportViewModal, printViewDom, reportViewData, loading, user, printFn }) => {
    return (
        <ModalUI
            isModalOpen={reportViewModal}
            handleCancel={() => setReportViewModal(false)}
            title="Daily Report"
            style={{ top: 0 }}
            handleOk={() => setReportViewModal(false)}
        >
            {loading ? (
                <LoadingUI />
            ) : (
                <>
                    <div className="max-h-[60vh] overflow-y-scroll p-4 print:max-h-[100vh] print:overflow-y-auto print:p-0" ref={printViewDom}>
                        {/* Header */}
                        <div className="mb-4 text-center">
                            <h1 className="text-xl font-bold">Madrasatul Hera Tangail</h1>
                            <p className="text-sm">Monohordi Nashid villa,Ibrhima vobon, Kandila, Tangail</p>
                        </div>

                        {/* Date and Time */}
                        <div className="mb-4 flex justify-between">
                            <div>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            <div>Print time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                        </div>

                        {/* Income Section */}
                        <div className="mb-4">
                            <h2 className="mb-2 font-bold">Income today</h2>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border">
                                        <th className="border p-2">S/N</th>
                                        <th className="border p-2">Income fields</th>
                                        <th className="border p-2">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportViewData?.incomings?.map((item, index) => (
                                        <tr key={index} className="border">
                                            <td className="border p-2">{index + 1}</td>
                                            <td className="border p-2">{item.type}</td>
                                            <td className="border p-2">{item.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Outgoing Section */}
                        <div className="mb-4">
                            <h2 className="mb-2 font-bold">Outgoing today</h2>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border">
                                        <td className="border p-2">S/N</td>
                                        <td className="border p-2">Voucher name</td>
                                        <td className="border p-2">Voucher no.</td>
                                        <td className="border p-2">Amount</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportViewData?.outgoings?.map((item, index) => (
                                        <tr key={index} className="border">
                                            <td className="border p-2">{index + 1}</td>
                                            <td className="border p-2">{item.name}</td>
                                            <td className="border p-2">23455</td>
                                            <td className="border p-2">{item.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Summary Section */}
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <span>Total Income today:</span>
                                <span>{reportViewData?.incomings?.reduce((total, item) => total + Number(item.amount), 0)} BDT</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total outgoing today:</span>
                                <span>{reportViewData?.outgoings?.reduce((total, item) => total + item.amount, 0)} BDT</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Current balance today:</span>
                                <span>
                                    {reportViewData?.incomings?.reduce((total, item) => total + Number(item.amount), 0) -
                                        reportViewData?.outgoings?.reduce((total, item) => total + item.amount, 0)}{' '}
                                    BDT
                                </span>
                            </div>
                        </div>

                        {/* Comment Section */}
                        <div className="mb-4">
                            <h2 className="mb-2 font-bold">Comment</h2>
                            <textarea className="min-h-[100px] w-full border p-2" placeholder="Hi this is a comment" />
                        </div>

                        {/* Signatures */}
                        <div className="mt-8 flex justify-between">
                            <div className="text-center">
                                <div className="w-32 border-t border-black">Head of department</div>
                            </div>
                            <div className="text-center">
                                <div className="w-32 border-t border-black">Principal</div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 text-center text-sm">
                            This report is printed by © {user?.name} ID:{user?.unique_id}{' '}
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                            onClick={() => {
                                printFn();
                            }}
                        >
                            Print
                        </button>
                        <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600" onClick={() => setReportViewModal(false)}>
                            Close
                        </button>
                    </div>
                </>
            )}
        </ModalUI>
    );
});

export default DailyReportViewComponent;
