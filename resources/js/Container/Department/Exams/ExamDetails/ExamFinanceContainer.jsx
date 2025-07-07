import ExamFinanceComponent from '@/Components/Department/Exams/ExamFinanceComponent';
import { DollarSign } from 'lucide-react';

const ExamFinanceContainer = ({ exam, classes }) => {
    // Calculate progress percentage
    const collectedAmount = classes?.reduce((total, item) => total + item.total_paid_amount, 0) || 0;
    const totalAmount = classes?.reduce((total, item) => total + item.expected_total_fee, 0) || 0;
    const progressPercentage = totalAmount > 0 ? (collectedAmount / totalAmount) * 100 : 0;

    // Sample class data - this would come from props in real implementation
    const classData =
        classes?.map((item) => ({
            id: item.class.id,
            name: item.class.name,
            collected: item.total_paid_amount,
            total: item.expected_total_fee,
            percentage: item.total_students > 0 ? (item.total_paid_amount / item.expected_total_fee) * 100 : 0,
        })) || [];

    if (exam?.is_fee_required === false) {
        return (
            <div className="flex items-center justify-center rounded-xl border border-blue-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
                <div className="p-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                        <DollarSign className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-gray-800">No Fee Required</h3>
                    <p className="text-lg text-gray-600">This exam does not require any payment</p>
                </div>
            </div>
        );
    }

    return (
        <ExamFinanceComponent
            collectedAmount={collectedAmount}
            totalAmount={totalAmount}
            progressPercentage={progressPercentage}
            classData={classData}
        />
    );
};

export default ExamFinanceContainer;
