import StaticBtn from '@/Components/UI/StaticBtn';
import { Plus } from 'lucide-react';

const AddExamContainer = () => {
    return (
        <div className="mt-[16px] flex justify-end">
            <StaticBtn className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-600">
                <Plus className="h-4 w-4" />
                Create exam
            </StaticBtn>
        </div>
    );
};

export default AddExamContainer;
