import ClassComponent from '@/Components/Department/Class/ClassComponent';
import AddClassModalFormContainer from './AddClassModalFormContainer';
import EditClassModalFormContainer from './EditClassModalFormContainer';

const ClassContainer = ({ classes, department }) => {
    return (
        <>
            <ClassComponent classes={classes} department={department} />
            <AddClassModalFormContainer />
            <EditClassModalFormContainer />
        </>
    );
};

export default ClassContainer;
