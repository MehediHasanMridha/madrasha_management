import DuePrintableComponent from '@/Components/Finance/Due/DuePrintableComponent';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import axios from 'axios';
import { useRef, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa6';
import { useReactToPrint } from 'react-to-print';

const DueDownloadContainer = () => {
    const printRef = useRef();
    const [data, setData] = useState([]);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Due-List-${new Date().toLocaleDateString()}`,
        onBeforePrint: () => {
            if (data.length > 0) {
                return Promise.resolve();
            }
        },
        pageStyle: `
            @page {
                size: A4;
                margin: .5in;
            }
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                    font-size: 12px;
                }
                .hidden {
                    display: none !important;
                }
                .print\\:block {
                    display: block !important;
                }
            }
        `,
    });

    const getData = async () => {
        try {
            const response = await axios.get(route('finance.download_due_list'));
            if (response.data.length > 0) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Error fetching due list data:', error);
            setData([]);
        }
    };

    return (
        <>
            <PrimaryButton
                onClick={async () => {
                    await getData();
                    handlePrint();
                }}
                className="flex cursor-pointer items-center gap-2 bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800"
            >
                <FaFilePdf className="text-sm" />
                Download PDF
            </PrimaryButton>
            {/* Hidden Printable Component */}
            <DuePrintableComponent data={data} ref={printRef} />
        </>
    );
};

export default DueDownloadContainer;
