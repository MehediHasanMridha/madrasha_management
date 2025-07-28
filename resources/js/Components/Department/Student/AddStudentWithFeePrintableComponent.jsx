import AdmissionFeePrintReceiptComponent from '@/Components/Shared/AdmissionFeePrintReceiptComponent';
import StaticBtn from '@/Components/UI/StaticBtn';

const AddStudentWithFeePrintableComponent = ({
    studentData,
    printComponentRef,
    printFn,
    loading,
    month,
    handleClose,
    admission_fee,
    collectedMonthlyFeeForPrint,
}) => {
    return (
        <div className="flex h-full flex-col space-y-4 px-2">
            {/* Printable Receipt Content */}
            <AdmissionFeePrintReceiptComponent
                ref={printComponentRef}
                student={studentData}
                month={month}
                admissionFee={admission_fee}
                collectedMonthlyFeeForPrint={collectedMonthlyFeeForPrint}
            />
            <div className="mt-auto flex w-full gap-[18px] pt-4 print:hidden">
                <StaticBtn
                    onClick={() => {
                        handleClose();
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

export default AddStudentWithFeePrintableComponent;
