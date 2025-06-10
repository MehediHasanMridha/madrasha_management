import DepartmentTabSectionComponent from '@/Components/Department/DepartmentTabSectionComponent';
import ExamCard from '@/Components/Department/Exams/ExamCard';
import AddExamContainer from './AddExamContainer';

const ExamsContainer = ({ department }) => {
    // Sample exam data - this would typically come from props or API
    const exams = [
        {
            id: 1,
            examName: 'Exam name',
            date: '1 April 2025',
            status: 'finished',
            timeLeft: null,
        },
        {
            id: 2,
            examName: 'Exam name',
            date: '1 April 2025',
            status: 'pending',
            timeLeft: '30d 20h 22m left',
        },
        {
            id: 3,
            examName: 'Exam name',
            date: '1 April 2025',
            status: 'not_scheduled',
            timeLeft: null,
        },
    ];

    return (
        <>
            <DepartmentTabSectionComponent type="exams" department={department} />
            <AddExamContainer />
            {/* Exams Section */}
            <div className="mt-[16px] grid grid-cols-1 gap-[12px]">
                {exams.map((exam) => (
                    <ExamCard key={exam.id} examName={exam.examName} date={exam.date} status={exam.status} timeLeft={exam.timeLeft} />
                ))}
            </div>
        </>
    );
};

export default ExamsContainer;
