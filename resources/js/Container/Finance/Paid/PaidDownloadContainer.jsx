import PaidPrintableComponent from '@/Components/Finance/Paid/PaidPrintableComponent';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import axios from 'axios';
import { useRef, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa6';
import { useReactToPrint } from 'react-to-print';

const PaidDownloadContainer = ({ filter, selectedFilters }) => {
    const printRef = useRef();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Paid-List-${filter?.filter || 'today'}-${new Date().toLocaleDateString()}`,
        onBeforePrint: async () => {
            if (data.length === 0) {
                await getData();
            }
            return Promise.resolve();
        },
        onAfterPrint: () => {
            setData([]);
        },
        pageStyle: `
            @page {
                size: A4 landscape;
                margin: .5in;
            }
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                    font-size: 10px;
                }
                .hidden {
                    display: none !important;
                }
                .print\\:block {
                    display: block !important;
                }
                table {
                    page-break-inside: auto;
                }
                tr {
                    page-break-inside: avoid;
                    page-break-after: auto;
                }
                td {
                    page-break-inside: avoid;
                    page-break-after: auto;
                }
            }
        `,
    });

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(route('finance.download_paid_list', { ...filter }));
            if (response.data.length > 0) {
                setData(response.data);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error('Error fetching paid list data:', error);
            setData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadClick = async () => {
        if (data.length === 0) {
            await getData();
        }
        handlePrint();
    };

    return (
        <>
            <PrimaryButton
                onClick={handleDownloadClick}
                disabled={isLoading}
                className="flex cursor-pointer items-center gap-2 bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <FaFilePdf className="text-sm" />
                {isLoading ? 'Loading...' : 'Download PDF'}
            </PrimaryButton>
            {/* Hidden Printable Component */}
            <PaidPrintableComponent data={data} selectedFilters={selectedFilters} filter={filter} ref={printRef} />
        </>
    );
};

export default PaidDownloadContainer;
