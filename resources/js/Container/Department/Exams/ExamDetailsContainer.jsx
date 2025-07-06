import { WhenVisible } from '@inertiajs/react';
import ExamClassScheduleAndMarkContainer from './ExamClassScheduleAndMarkContainer';
import ExamFinanceContainer from './ExamFinanceContainer';

const ExamDetailsContainer = ({ exam, department, classes }) => {
    return (
        <div className="my-5 w-full">
            <ExamFinanceContainer exam={exam} classes={classes} />
            <WhenVisible data={'subjects'} fallback={<div>Loading Mehedi...</div>}>
                <ExamClassScheduleAndMarkContainer exam={exam} department={department} classes={classes} />
            </WhenVisible>
        </div>
    );
};

export default ExamDetailsContainer;
