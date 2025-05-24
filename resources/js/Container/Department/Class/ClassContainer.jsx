import ClassComponent from '@/Components/Department/Class/ClassComponent';
import AddClassModalFormContainer from './AddClassModalFormContainer';

const ClassContainer = ({ classes, department }) => {
    return (
        <>
            <ClassComponent classes={classes} department={department} />
            <AddClassModalFormContainer />
        </>
    );
};

export default ClassContainer;
