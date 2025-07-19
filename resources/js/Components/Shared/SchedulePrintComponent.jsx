import { usePage } from '@inertiajs/react';
import { forwardRef } from 'react';
import ApplicationLogo from '../ApplicationLogo';

const SchedulePrintComponent = forwardRef((props, ref) => {
    const { exam, classes, examSchedule, getBengaliNumber } = props;
    const { institute } = usePage().props;
    return (
        <div ref={ref} className="mx-auto flex hidden w-full max-w-4xl flex-col items-center gap-3 p-4 font-['Poppins'] print:block">
            {/* Header Section with Logo and Institution Info */}
            <div className="flex w-full items-center gap-3 border-b-[1.5px] border-gray-800 bg-gray-50 px-4 py-4">
                {/* Logo Placeholder - Replace with actual logo */}
                <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                        <ApplicationLogo className="h-8 w-8 text-gray-800" />
                    </div>
                </div>

                {/* Institution Info */}
                <div className="flex flex-1 flex-col gap-1">
                    <h1 className="text-xl leading-tight font-semibold tracking-tight text-gray-800">{institute.name_bangla}</h1>
                    <p className="text-xs leading-tight tracking-tight text-gray-800">{institute.address}</p>
                </div>

                {/* Exam Title */}
                <div className="items-center justify-center gap-2.5 rounded-sm border-[0.5px] border-gray-800 bg-white px-2 py-1.5 text-gray-800">
                    <div className="text-sm leading-6 font-normal">{exam?.name}</div>
                    {classes && classes?.length > 0 && (
                        <span className="text-[10px] leading-6 font-normal">
                            {classes?.map((classItem, index) => (
                                <span key={classItem.id}>
                                    {classItem.name}
                                    {index < classes.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </span>
                    )}
                </div>
            </div>

            {/* Exam Schedule Header */}
            <div className="flex items-center justify-center gap-2.5 rounded-sm border-[0.5px] border-gray-800 bg-white px-2 py-1.5 text-gray-800">
                <span className="text-sm leading-6 font-normal">পরীক্ষার রুটিন</span>
            </div>

            {/* Table Container */}
            <div className="flex w-full flex-col rounded-sm border-[0.5px] border-gray-800">
                {/* Table Header */}
                <div className="flex items-center border-b-[0.5px] border-gray-800 bg-gray-100">
                    <div className="flex w-12 items-center justify-center border-r-[0.5px] border-gray-800 px-2 py-1 text-center text-xs leading-6 font-normal text-gray-800">
                        ক্রমিক
                    </div>
                    <div className="flex flex-1 items-center border-r-[0.5px] border-gray-800 px-2 py-1 text-center text-xs leading-6 font-normal text-gray-800">
                        বিষয়
                    </div>
                    <div className="flex flex-1 items-center border-r-[0.5px] border-gray-800 px-2 py-1 text-center text-xs leading-6 font-normal text-gray-800">
                        তাবিখ
                    </div>
                    <div className="flex flex-1 items-center px-2 py-1 text-center text-xs leading-6 font-normal text-gray-800">সময়</div>
                </div>

                {/* Table Rows */}
                {examSchedule?.map((exam, index) => (
                    <div key={exam.id} className={`flex items-center ${index < examSchedule.length - 1 ? 'border-b-[0.5px] border-gray-800' : ''}`}>
                        <div className="flex w-12 items-center justify-center border-r-[0.5px] border-gray-800 px-2 py-1 text-center text-xs leading-6 font-normal text-gray-800">
                            {getBengaliNumber(index + 1)}
                        </div>
                        <div className="flex flex-1 items-center border-r-[0.5px] border-gray-800 px-2 py-1 text-xs leading-6 font-normal text-gray-800">
                            {exam.subject}
                        </div>
                        <div className="flex flex-1 items-center border-r-[0.5px] border-gray-800 px-2 py-1 text-xs leading-6 font-normal text-gray-800">
                            {exam.date}
                        </div>
                        <div className="flex flex-1 items-center px-2 py-1 text-xs leading-6 font-normal text-gray-800">{exam.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default SchedulePrintComponent;
