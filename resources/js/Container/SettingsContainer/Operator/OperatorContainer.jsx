import AddOperatorContainer from './AddOperatorContainer';
import OperatorListTableContainer from './OperatorListTableContainer';

const OperatorContainer = ({ operators }) => {
    return (
        <>
            <div className="text-2xl font-semibold">Manage operator</div>
            <AddOperatorContainer />
            <OperatorListTableContainer operators={operators} />
        </>
    );
};

export default OperatorContainer;
