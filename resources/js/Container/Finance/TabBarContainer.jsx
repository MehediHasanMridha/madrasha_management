import { Link } from '@inertiajs/react';
import { FaChartPie } from 'react-icons/fa';

const TabBarContainer = ({ activeTab, setActiveTab }) => {
    return (
        <div className="mb-6 flex rounded-lg bg-white shadow-sm">
            <Link
                href={route('finance.summary')}
                className={`flex items-center gap-2 px-4 py-3 ${activeTab === 'summary' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                onClick={() => setActiveTab('summary')}
                preserveState={true}
            >
                <FaChartPie className={activeTab === 'summary' ? 'text-blue-500' : 'text-gray-500'} />
                <span>Summary</span>
            </Link>
            <Link
                href={route('finance.earnings')}
                className={`flex items-center gap-2 px-4 py-3 ${activeTab === 'earnings' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                onClick={() => setActiveTab('earnings')}
                preserveState={true}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Earnings</span>
            </Link>
            <Link
                href={route('finance.outgoings')}
                className={`flex items-center gap-2 px-4 py-3 ${activeTab === 'outgoings' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                onClick={() => setActiveTab('outgoings')}
                preserveState={true}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>Outgoings</span>
            </Link>
            {/* <Link
                href={route('finance.monthly-reports')}
                className={`flex items-center gap-2 px-4 py-3 ${activeTab === 'monthly-reports' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                onClick={() => setActiveTab('monthly-reports')}
                preserveState={true}
            >
                <FaFileAlt className={activeTab === 'monthly-reports' ? 'text-blue-500' : 'text-gray-500'} />
                <span>Monthly reports</span>
            </Link> */}
        </div>
    );
};

export default TabBarContainer;
