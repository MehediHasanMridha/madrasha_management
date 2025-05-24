import DepartmentViewComponent from '@/Components/Department/DepartmentViewComponent';
import { useDepartmentStore } from '@/stores';
import AddDepartmentModalFormContainer from './AddDepartmentModalFormContainer';

const DepartmentViewContainer = ({ departments }) => {
    const { dept_modal, setDept_Modal } = useDepartmentStore((state) => state);
    return (
        <>
            <DepartmentViewComponent departments={departments} addModal={setDept_Modal} />
            <AddDepartmentModalFormContainer isModalOpen={dept_modal.add} setIsModalOpen={(data) => setDept_Modal({ add: data })} />
        </>
    );
};

export default DepartmentViewContainer;
