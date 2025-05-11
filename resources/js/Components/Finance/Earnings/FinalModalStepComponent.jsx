import Logo from '@/assets/images/logo.png';
import StaticBtn from '@/Components/UI/StaticBtn';
import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { formattedAmount } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { useCallback, useRef } from 'react';
import { FaPhone } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';

const FinalModalStepComponent = ({ data, fee, selectedRows, handleClose, loading, setModal, setLoading, setStep, year, comments }) => {
    const printComponentRef = useRef(null);
    const currentDate = new Date();
    const { user } = usePage().props.auth;
    const formattedDate = currentDate.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    console.log('🚀 ~ FinalModalStepComponent ~ user:', user);

    const handleBeforePrint = useCallback(() => {
        setLoading(true);
        return Promise.resolve();
    }, []);

    const handleAfterPrint = () => {
        // handleClose();
        setLoading(false);
    };

    const printFn = useReactToPrint({
        contentRef: printComponentRef,
        documentTitle: `Receipt_${data?.unique_id}_${new Date().toISOString().split('T')[0]}`,
        onAfterPrint: handleAfterPrint,
        onBeforePrint: handleBeforePrint,
        // receipt page size is small & font size is small & print to printable area
        pageStyle: `
            @media print {
                @page {
                    size: A5;
                    margin: 12px;
                }
                body {
                    font-size: 8px;
                    margin: 0;
                    padding: 0;
                    line-height: 1.2;

                }
            }
        `,
    });

    return (
        <div className="flex h-full flex-col space-y-4 px-2">
            {/* Printable Receipt Content */}
            <div className="space-y-4" ref={printComponentRef}>
                {/* School Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={Logo} alt="School Logo" className="h-12 print:h-[37px]" />
                        <div>
                            <h1 className="text-lg font-bold print:text-[18px]">Madrasatul Hera Tangail</h1>
                            <p className="text-sm text-gray-600 print:text-[10px]">Munshwpara Rashid Villa, Rahman vaban, Kedialla, Tangail</p>
                        </div>
                    </div>
                    <div className="text-right text-sm print:text-[10px]">
                        <div className="flex items-center justify-end gap-2">
                            <FaPhone className="h-[8px] w-[8px]" />
                            <span>017170-52793</span>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <FaPhone className="h-[8px] w-[8px]" />
                            <span>017170-52793</span>
                        </div>
                    </div>
                </div>
                <hr />
                {/* Student Info */}
                {data && (
                    <div className="flex items-center justify-between rounded-[8px]">
                        <div className="flex items-center space-x-4">
                            <img
                                src={getAvatarImage(data.image, 'student_images', data.name)}
                                alt="Student"
                                className="h-[50px] w-[50px] rounded-full border print:h-[28px] print:w-[28px]"
                            />
                            <div>
                                <p className="text-lg font-semibold print:text-[12px]">{data.name || 'N/A'}</p>
                                <p className="text-sm text-gray-600 print:text-[10px]">
                                    {data?.unique_id} • {data?.department}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-semibold print:text-[12px]">Monthly Payment Receipt</div>
                            <div className="text-sm text-gray-600 print:text-[10px]">Date: {formattedDate}</div>
                        </div>
                    </div>
                )}

                {/* Monthly Fee Table */}
                {selectedRows && selectedRows.length > 0 && (
                    <div className="h-[200px] overflow-x-auto overflow-y-scroll print:h-fit print:overflow-y-auto">
                        <table className="w-full min-w-full table-auto border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="border px-4 py-2 text-left">S/N</th>
                                    <th className="border px-4 py-2 text-left">Month ({year})</th>
                                    <th className="border px-4 py-2 text-right">Boarding fee</th>
                                    <th className="border px-4 py-2 text-right">Academic fee</th>
                                    <th className="border px-4 py-2 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedRows.map((row, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{row.month}</td>
                                        <td className="border px-4 py-2 text-right">{formattedAmount(fee?.boarding_fee || 500)}</td>
                                        <td className="border px-4 py-2 text-right">{formattedAmount(fee?.academic_fee || 500)}</td>
                                        <td className="border px-4 py-2 text-right">
                                            {formattedAmount((fee?.boarding_fee || 500) + (fee?.academic_fee || 500))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Payment Summary */}
                <div className="mt-6 flex justify-between rounded-[4px] border-[0.5px] border-[#131313] p-4">
                    <div className="w-full space-y-2">
                        <div className="flex justify-between">
                            <span>Sub Total:</span>
                            <span>{formattedAmount(fee?.total || 0)} BDT</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount:</span>
                            <span>{formattedAmount(fee?.discount || 0)} BDT</span>
                        </div>
                        <div className="flex justify-between border-t border-dashed pt-2 font-bold">
                            <span>Grand total:</span>
                            <span>{formattedAmount((fee?.total || 0) - (fee?.discount || 0))} BDT</span>
                        </div>
                        <div className="flex justify-between border-t border-dashed pt-2">
                            <span>Paid:</span>
                            <span>{formattedAmount(fee?.total || 0)} BDT</span>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                {comments && (
                    <div className="mt-6">
                        <h3 className="mb-2 font-medium">Comment</h3>
                        <p className="h-fit w-full rounded-[4px] border-[0.5px] border-[#131313] p-3 print:h-[50px]">{comments} </p>
                    </div>
                )}
                <div className="flex items-center justify-center gap-2">
                    Added by :
                    <img
                        src={getAvatarImage(user?.img, 'staff_images', user?.name)}
                        alt=""
                        className="h-[20px] w-[20px] rounded-sm print:h-[10px] print:w-[10px]"
                    />
                    {user?.name} ID: {user?.unique_id}
                </div>
            </div>

            {/* Action Buttons - Not Printed */}
            <div className="mt-auto flex w-full gap-[18px] pt-4 print:hidden">
                <StaticBtn
                    onClick={() => {
                        handleClose();
                        setModal(false);
                    }}
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#0267FF] hover:text-white"
                >
                    Close
                </StaticBtn>
                <StaticBtn
                    className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#0267FF] text-white"
                    onClick={printFn}
                >
                    {loading ? 'generating...' : 'Print Receipt'}
                </StaticBtn>
            </div>
        </div>
    );
};

export default FinalModalStepComponent;
