import FinanceTabBarComponent from '@/Components/Finance/FinanceTabBarComponent';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Summary({ data }) {
    // const [activeTab, setActiveTab] = useState('summary');
    // const [earnings, setEarnings] = useState({
    //     earningMonth: new Date().toLocaleString('default', { month: 'long' }),
    //     earningYear: new Date().getFullYear(),
    //     outgoingMonth: new Date().toLocaleString('default', { month: 'long' }),
    //     outgoingYear: new Date().getFullYear(),
    // }); //get the current month dynamically
    // const [showEarningsMonthDropdown, setShowEarningsMonthDropdown] = useState(false);
    // const [showEarningsYearDropdown, setShowEarningsYearDropdown] = useState(false);
    // const [showExpensesMonthDropdown, setShowExpensesMonthDropdown] = useState(false);
    // const [showExpensesYearDropdown, setShowExpensesYearDropdown] = useState(false);

    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // const years = ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'];

    // const handleEarnings = (data) => {
    //     router.get(route('finance.summary'), data, {
    //         preserveState: true,
    //         preserveScroll: true,
    //         replace: true,
    //         // reset: true,
    //     });
    // };

    return (
        <AuthenticatedLayout>
            <Head title="Finance Summary" />
            <div className="py-6">
                <FinanceTabBarComponent tab="summary" />
            </div>
        </AuthenticatedLayout>
    );
}
