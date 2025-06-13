import DepartmentTabSectionComponent from '@/Components/Department/DepartmentTabSectionComponent';
import ExamCard from '@/Components/Department/Exams/ExamCard';
import AddExamContainer from './AddExamContainer';

const ExamsContainer = ({ department, classes, exams }) => {
    return (
        <>
            <DepartmentTabSectionComponent type="exams" department={department} />
            <AddExamContainer classes={classes} department={department} />
            {/* Exams Section */}
            <div className="my-[16px] grid grid-cols-1 gap-[12px]">
                {exams && exams.length > 0 ? (
                    exams.map((exam) => (
                        <ExamCard
                            key={exam.id}
                            examName={exam.name}
                            date={new Date(exam.start_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                            status={exam.display_status}
                            timeLeft={exam.time_left}
                        />
                    ))
                ) : (
                    <div className="py-8 text-center text-gray-500">
                        <p>No exams scheduled yet.</p>
                        <p className="mt-2 text-sm">Click "Create exam" to add your first exam.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ExamsContainer;
