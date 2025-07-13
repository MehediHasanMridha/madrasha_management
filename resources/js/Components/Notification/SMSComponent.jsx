import { useState } from 'react';
import { IoAdd, IoClose } from 'react-icons/io5';
import CustomSelect from '../../Container/Notification/CustomSelect';
import Toggle from '../../Container/Notification/Toggle';
import Field from '../UI/Field';
import StaticBtn from '../UI/StaticBtn';

const SMSComponent = () => {
    const [selectedRecipients, setSelectedRecipients] = useState({
        allStudents: true,
        allStaff: false,
        dueStudents: false,
        selectedDepartments: true,
        selectedStudents: false,
    });

    const [selectedDepartments, setSelectedDepartments] = useState({
        islamicSchool: { selected: true, class: 'all' },
        hifjoBivag: { selected: false, class: '4' },
        najeraBivag: { selected: false, class: '' },
        kitabBivag: { selected: false, class: '' },
        kodimNesab: { selected: false, class: '' },
    });

    const [studentIds, setStudentIds] = useState(['2025-S0663']);

    const departmentOptions = [
        { value: 'all', label: 'All class' },
        { value: '1', label: 'Class 1' },
        { value: '2', label: 'Class 2' },
        { value: '3', label: 'Class 3' },
        { value: '4', label: 'Class 4' },
        { value: '5', label: 'Class 5' },
    ];

    const handleRecipientToggle = (key) => {
        setSelectedRecipients((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleDepartmentToggle = (department) => {
        setSelectedDepartments((prev) => ({
            ...prev,
            [department]: {
                ...prev[department],
                selected: !prev[department].selected,
            },
        }));
    };

    const handleDepartmentClassChange = (department, classValue) => {
        setSelectedDepartments((prev) => ({
            ...prev,
            [department]: {
                ...prev[department],
                class: classValue,
            },
        }));
    };

    const removeStudentId = (idToRemove) => {
        setStudentIds((prev) => prev.filter((id) => id !== idToRemove));
    };

    const addStudentId = () => {
        // This would typically open a modal or form to add student ID
        console.log('Add student ID');
    };
    return (
        <div className="mt-6 space-y-3">
            <div className="flex space-x-10 rounded-lg bg-white p-10">
                <div className="">
                    <h2 className="text-2xl font-semibold text-gray-800">127 BDT</h2>
                    <p className="text-sm text-gray-500">SMS Balance</p>
                </div>
                <div className="">
                    <h2 className="text-2xl font-semibold text-gray-800">0.50 BDT</h2>
                    <p className="text-sm text-gray-500">Per page SMS rate (20 character = 1 SMS)</p>
                </div>
            </div>

            <Field label="SMS Message" className="relative w-full rounded-lg bg-white p-6">
                <>
                    <textarea
                        className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                        rows={6}
                        placeholder="Enter your SMS message here.........."
                    />
                    <StaticBtn className="my-2">Send</StaticBtn>
                </>
            </Field>
            {/* Recipient Selection Section */}
            <Field label="Choose who will get this SMS" className="relative w-full rounded-lg bg-white p-6">
                <div className="space-y-4">
                    {/* All Students */}
                    <div className="flex items-center justify-between rounded-xl bg-[#F6F6F6] p-4">
                        <span className="text-base text-[#131313]">All student</span>
                        <Toggle enabled={selectedRecipients.allStudents} onChange={() => handleRecipientToggle('allStudents')} />
                    </div>

                    {/* All Staff */}
                    <div className="flex items-center justify-between rounded-xl bg-[#F6F6F6] p-4">
                        <span className="text-base text-[#131313]">All staff</span>
                        <Toggle enabled={selectedRecipients.allStaff} onChange={() => handleRecipientToggle('allStaff')} />
                    </div>

                    {/* Due Students */}
                    <div className="flex items-center justify-between rounded-xl bg-[#F6F6F6] p-4">
                        <span className="text-base text-[#131313]">Due students</span>
                        <Toggle enabled={selectedRecipients.dueStudents} onChange={() => handleRecipientToggle('dueStudents')} />
                    </div>

                    {/* Selected Departments */}
                    <div className="space-y-4 rounded-xl bg-[#F6F6F6] p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-base text-[#131313]">Selected departments</span>
                            <Toggle enabled={selectedRecipients.selectedDepartments} onChange={() => handleRecipientToggle('selectedDepartments')} />
                        </div>

                        {selectedRecipients.selectedDepartments && (
                            <div className="space-y-3">
                                {/* Islamic School */}
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedDepartments.islamicSchool.selected}
                                        onChange={() => handleDepartmentToggle('islamicSchool')}
                                        className="h-6 w-6 rounded border-[#AFAFAF] text-[#0267FF] focus:ring-[#0267FF]"
                                    />
                                    <span className="w-32 text-base text-[#131313]">Islamic school</span>
                                    <CustomSelect
                                        options={departmentOptions}
                                        value={selectedDepartments.islamicSchool.class}
                                        onChange={(value) => handleDepartmentClassChange('islamicSchool', value)}
                                        placeholder="All class"
                                        className="w-[300px]"
                                    />
                                </div>

                                {/* Hifjo Bivag */}
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedDepartments.hifjoBivag.selected}
                                        onChange={() => handleDepartmentToggle('hifjoBivag')}
                                        className="h-6 w-6 rounded border-[#AFAFAF] text-[#0267FF] focus:ring-[#0267FF]"
                                    />
                                    <span className="w-32 text-base text-[#131313]">Hifjo bivag</span>
                                    <CustomSelect
                                        options={departmentOptions}
                                        value={selectedDepartments.hifjoBivag.class}
                                        onChange={(value) => handleDepartmentClassChange('hifjoBivag', value)}
                                        placeholder="4 classes"
                                        className="w-[300px]"
                                    />
                                </div>

                                {/* Najera Bivag */}
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedDepartments.najeraBivag.selected}
                                        onChange={() => handleDepartmentToggle('najeraBivag')}
                                        className="h-6 w-6 rounded border-[#AFAFAF] text-[#0267FF] focus:ring-[#0267FF]"
                                    />
                                    <span className="w-32 text-base text-[#131313]">Najera bivag</span>
                                    <CustomSelect
                                        options={departmentOptions}
                                        value={selectedDepartments.najeraBivag.class}
                                        onChange={(value) => handleDepartmentClassChange('najeraBivag', value)}
                                        placeholder="Select class"
                                        className="w-[300px]"
                                    />
                                </div>

                                {/* Kitab Bivag */}
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedDepartments.kitabBivag.selected}
                                        onChange={() => handleDepartmentToggle('kitabBivag')}
                                        className="h-6 w-6 rounded border-[#AFAFAF] text-[#0267FF] focus:ring-[#0267FF]"
                                    />
                                    <span className="w-32 text-base text-[#131313]">Kitab bivag</span>
                                    <CustomSelect
                                        options={departmentOptions}
                                        value={selectedDepartments.kitabBivag.class}
                                        onChange={(value) => handleDepartmentClassChange('kitabBivag', value)}
                                        placeholder="Select class"
                                        className="w-[300px]"
                                    />
                                </div>

                                {/* Kodim Nesab */}
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedDepartments.kodimNesab.selected}
                                        onChange={() => handleDepartmentToggle('kodimNesab')}
                                        className="h-6 w-6 rounded border-[#AFAFAF] text-[#0267FF] focus:ring-[#0267FF]"
                                    />
                                    <span className="w-32 text-base text-[#131313]">Kodim nesab</span>
                                    <CustomSelect
                                        options={departmentOptions}
                                        value={selectedDepartments.kodimNesab.class}
                                        onChange={(value) => handleDepartmentClassChange('kodimNesab', value)}
                                        placeholder="Select class"
                                        className="w-[300px]"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Selected Students */}
                    <div className="space-y-4 rounded-xl bg-[#F6F6F6] p-4">
                        <span className="text-base text-[#131313]">Selected students</span>

                        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#AFAFAF] p-3">
                            {studentIds.map((studentId, index) => (
                                <div key={index} className="flex items-center gap-2 rounded-full border border-[#AFAFAF] bg-gray-100 px-2 py-1">
                                    <span className="text-sm text-[#666666]">{studentId}</span>
                                    <button type="button" onClick={() => removeStudentId(studentId)} className="text-[#AFAFAF] hover:text-gray-700">
                                        <IoClose className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addStudentId}
                                className="flex items-center gap-2 px-2 py-1 text-sm text-[#666666] hover:text-gray-800"
                            >
                                <IoAdd className="h-4 w-4 text-[#0267FF]" />
                                Add student ID
                            </button>
                        </div>
                    </div>
                </div>
            </Field>
        </div>
    );
};

export default SMSComponent;
