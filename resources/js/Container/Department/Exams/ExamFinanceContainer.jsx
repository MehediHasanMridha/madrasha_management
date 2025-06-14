import ExamFinanceComponent from '@/Components/Department/Exams/ExamFinanceComponent';

const ExamFinanceContainer = ({ examData }) => {
    // Calculate progress percentage
    const collectedAmount = examData?.collectedAmount || 608764;
    const totalAmount = examData?.totalAmount || 898567;
    const progressPercentage = totalAmount > 0 ? (collectedAmount / totalAmount) * 100 : 0;

    // Sample class data - this would come from props in real implementation
    const classData = examData?.classes || [
        { id: 1, name: 'Class 1', collected: 608764, total: 898567, percentage: 30 },
        { id: 2, name: 'Class 2', collected: 608764, total: 898567, percentage: 30 },
        { id: 3, name: 'Class 3', collected: 608764, total: 898567, percentage: 30 },
        { id: 4, name: 'Class 4', collected: 608764, total: 898567, percentage: 30 },
        { id: 5, name: 'Class 5', collected: 608764, total: 898567, percentage: 30 },
    ];
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
