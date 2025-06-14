import ExamFinanceContainer from './ExamFinanceContainer';

const ExamDetailsContainer = ({ examData }) => {
    return (
        <div className="my-5 w-full">
            <ExamFinanceContainer examData={examData} />
        </div>
    );
};

export default ExamDetailsContainer;
