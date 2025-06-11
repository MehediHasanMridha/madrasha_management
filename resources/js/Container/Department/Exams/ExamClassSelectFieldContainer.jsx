import FieldSet from '@/Components/UI/FieldSet';
import { ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ExamClassSelectFieldContainer = ({ data, setData }) => {
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [showClassDropdown, setShowClassDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const availableClasses = [
        { id: 1, name: 'Class 1' },
        { id: 2, name: 'Class 2' },
        { id: 3, name: 'Class 3' },
        { id: 4, name: 'Class 4' },
        { id: 5, name: 'Class 5' },
        { id: 6, name: 'Class 6' },
        { id: 7, name: 'Class 7' },
        { id: 8, name: 'Class 8' },
        { id: 9, name: 'Class 9' },
        { id: 10, name: 'Class 10' },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowClassDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClassSelect = (classItem) => {
        if (!selectedClasses.find((item) => item.id === classItem.id)) {
            setSelectedClasses([...selectedClasses, classItem]);
            setData({
                classes: [...selectedClasses, classItem],
            });
        }
        setShowClassDropdown(false);
    };

    const handleClassRemove = (classId) => {
        setSelectedClasses(selectedClasses.filter((item) => item.id !== classId));
    };

    return (
        <FieldSet label={'Select Class'} labelClassName="font-normal text-lg" className="flex flex-col gap-2">
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setShowClassDropdown(!showClassDropdown)}
                    className="flex w-full items-center justify-between rounded-sm border border-[#AFAFAF] px-3 py-3 text-base font-normal text-[#AFAFAF]"
                >
                    <span>Select class</span>
                    <ChevronDown className="h-6 w-6 stroke-[1.5]" />
                </button>

                {showClassDropdown && (
                    <div className="absolute top-full right-0 left-0 z-10 mt-1 max-h-48 overflow-y-auto rounded-lg border border-[#AFAFAF] bg-white p-3 shadow-lg">
                        {availableClasses.map((classItem) => (
                            <button
                                key={classItem.id}
                                onClick={() => handleClassSelect(classItem)}
                                className="w-full rounded px-3 py-2 text-left font-normal text-[#131313] hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={selectedClasses.find((item) => item.id === classItem.id)}
                            >
                                {classItem.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Classes */}
            {selectedClasses.length > 0 && (
                <div className="flex flex-wrap gap-2.5 rounded-lg border border-[#AFAFAF] p-3">
                    {selectedClasses.map((classItem) => (
                        <div key={classItem.id} className="flex items-center">
                            <div className="flex h-7 items-center rounded-l-full border border-[#AFAFAF] bg-white px-2 py-1">
                                <span className="text-xs font-normal text-[#666666]">{classItem.name}</span>
                            </div>
                            <button
                                onClick={() => handleClassRemove(classItem.id)}
                                className="flex h-7 w-7 items-center justify-center rounded-r-full border border-l-0 border-[#AFAFAF] bg-white p-1 transition-colors hover:bg-gray-50"
                            >
                                <X className="h-3 w-3 stroke-[1] text-[#4A4A4A]" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </FieldSet>
    );
};

export default ExamClassSelectFieldContainer;
