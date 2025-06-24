import DuePrintableComponent from '@/Components/Finance/Due/DuePrintableComponent';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import axios from 'axios';
import { useRef, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa6';
import { useReactToPrint } from 'react-to-print';

const DueDownloadContainer = ({ filter, selectedFilters }) => {
    const printRef = useRef();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Due-List-${new Date().toLocaleDateString()}`,
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
        setIsLoading(true);
        try {
            const response = await axios.get(route('finance.download_due_list', { ...filter }));
            if (response.data.length > 0) {
                setData(response.data);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error('Error fetching due list data:', error);
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
                className="flex cursor-pointer items-center gap-2 bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <FaFilePdf className="text-sm" />
                {isLoading ? 'Loading...' : 'Download PDF'}
            </PrimaryButton>
            {/* Hidden Printable Component */}
            <DuePrintableComponent data={data} selectedFilters={selectedFilters} ref={printRef} />
        </>
    );
};

export default DueDownloadContainer;
