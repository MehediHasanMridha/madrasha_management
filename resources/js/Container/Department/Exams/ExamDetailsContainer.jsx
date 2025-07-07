import ExamClassScheduleAndMarkContainer from './ExamClassScheduleAndMarkContainer';
import ExamFinanceContainer from './ExamFinanceContainer';

const ExamDetailsContainer = ({ exam, department, classes }) => {
    return (
        <div className="my-5 w-full">
            <ExamFinanceContainer exam={exam} classes={classes} />
            <ExamClassScheduleAndMarkContainer exam={exam} department={department} classes={classes} />
        </div>
    );
};

export default ExamDetailsContainer;
