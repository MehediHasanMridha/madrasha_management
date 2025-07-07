import AccordionUI from '@/Components/UI/AccordionUI';
import { PlaceholderList } from '@/Components/UI/PlaceholderUI';
import { WhenVisible } from '@inertiajs/react';
import { ArrowBigDown } from 'lucide-react';
import { useState } from 'react';
import ExamMarkContainer from './ExamMarkContainer';
import ExamScheduleContainer from './ExamScheduleContainer';

const ExamClassScheduleAndMarkContainer = ({ exam, department, classes }) => {
    const [currentClassId, setCurrentClassId] = useState(null);

    // Get exam subjects for a specific class

    const accordionItems =
        classes?.map((classItem, index) => ({
            key: `${index + 1}`,
            label: (
                <div className="flex w-full items-center justify-between">
                    <span className="text-lg font-medium text-[#131313]">{classItem.class.name}</span>
                </div>
            ),
            children: (
                <div className="space-y-8">
                    {/* Schedule Section */}
                    <WhenVisible data={'subjects'} fallback={<PlaceholderList items={5} showAvatar={false} className="mt-4" />}>
                        <ExamScheduleContainer classItem={classItem} exam={exam} />
                    </WhenVisible>

                    {/* Mark Sheet Section */}
                    <WhenVisible data={'students'} fallback={<PlaceholderList items={5} showAvatar={true} className="mt-4" />}>
                        <ExamMarkContainer classItem={classItem} exam={exam} />
                    </WhenVisible>
                </div>
            ),
        })) || [];

    return (
        <>
            <div className="mt-6">
                <AccordionUI
                    items={accordionItems}
                    expandIconPosition="end"
                    expandIcon={({ isActive }) => (isActive ? <ArrowBigDown className="rotate-180" /> : <ArrowBigDown />)}
                    className="border border-[#AFAFAF]"
                    bordered={false}
                />
            </div>
        </>
    );
};

export default ExamClassScheduleAndMarkContainer;
