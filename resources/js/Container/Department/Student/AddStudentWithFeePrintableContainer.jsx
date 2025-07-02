import AddStudentWithFeePrintableComponent from '@/Components/Department/Student/AddStudentWithFeePrintableComponent';
import { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const AddStudentWithFeePrintableContainer = ({ data, handleClose, month, admission_fee }) => {
    const [loading, setLoading] = useState(false);
    const printComponentRef = useRef(null);
    const handleBeforePrint = useCallback(() => {
        setLoading(true);
        return Promise.resolve();
    }, []);

    const handleAfterPrint = () => {
        setLoading(false);
        handleClose();
    };

    const printFn = useReactToPrint({
        contentRef: printComponentRef,
        documentTitle: `Admission_Fee_Receipt_${data?.unique_id}_${new Date().toISOString().split('T')[0]}`,
        onAfterPrint: handleAfterPrint,
        onBeforePrint: handleBeforePrint,
        // Receipt page size is small & font size is small & print to printable area
        pageStyle: `
                    @media print {
                        @page {
                            size: A5;
                            margin: 32px;
                        }
                        body {
                            font-size: 12px;
                            margin: 0;
                            padding: 0;
                            line-height: 1.2;
                        }
                    }
                `,
    });
    return (
        <AddStudentWithFeePrintableComponent
            printFn={printFn}
            printComponentRef={printComponentRef}
            data={data}
            month={month}
            loading={loading}
            handleClose={handleClose}
            admission_fee={admission_fee}
        />
    );
};

export default AddStudentWithFeePrintableContainer;
