import ClassTableListContainer from '@/Container/Department/Class/ClassTableListContainer';
import BreadcrumbComponent from './BreadcrumbComponent';
const ClassComponent = ({ classes = [], department = {} }) => {
    return (
        <>
            <BreadcrumbComponent department={department} />

            <div className="my-6 flex flex-col gap-4 rounded-lg bg-white pb-6">
                <div className="border-b border-gray-300 px-6 py-3">
                    <h2 className="text-lg font-normal text-gray-900">Manage Class</h2>
                </div>

                <div className="px-6">
                    <ClassTableListContainer department={department} classes={classes} />
                </div>
            </div>
        </>
    );
};

export default ClassComponent;
