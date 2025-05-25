import DepartmentViewComponent from '@/Components/Department/DepartmentViewComponent';
import { useDepartmentStore } from '@/stores';
import AddDepartmentModalFormContainer from './AddDepartmentModalFormContainer';
import EditDepartmentModalFormContainer from './EditDepartmentModalFormContainer';

const DepartmentViewContainer = ({ departments }) => {
    const { modal, setModal } = useDepartmentStore((state) => state);
    return (
        <>
            <DepartmentViewComponent departments={departments} addModal={setModal} />
            <AddDepartmentModalFormContainer />
            <EditDepartmentModalFormContainer />
        </>
    );
};

export default DepartmentViewContainer;
