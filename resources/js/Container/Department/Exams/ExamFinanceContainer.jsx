import ExamFinanceComponent from '@/Components/Department/Exams/ExamFinanceComponent';

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
