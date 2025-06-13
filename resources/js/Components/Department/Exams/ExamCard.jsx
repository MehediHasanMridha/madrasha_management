import ExamIcon from '@/assets/images/exam.webp';
import ExamStatusBadgeContainer from '@/Container/Department/Exams/ExamStatusBadgeContainer';
import { EllipsisVertical } from 'lucide-react';

const ExamCard = ({
    examName = 'Exam name',
    date = '1 April 2025',
    status = 'finished', // finished, pending, not_scheduled
    timeLeft = '30d 20h 22m left',
}) => {
    return (
        <div className="flex w-full items-center gap-[22px] rounded-[8px] bg-white p-[12px] shadow-[0px_8px_20px_0px_rgba(0,0,0,0.04)]">
            <div className="relative h-[80px] w-[80px] flex-shrink-0 overflow-hidden rounded-[8px]">
                <img src={ExamIcon} alt="Exam placeholder" className="h-full w-full rounded-[8px] object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-[6px]">
                <div className="flex flex-col gap-[12px] sm:flex-row sm:items-center sm:justify-between sm:gap-[24px]">
                    <h3 className="text-[24px] leading-[1.5em] font-[500] text-[#131313]">{examName}</h3>
                </div>
                <div className="flex items-center">
                    <span className="text-[16px] leading-[1.5em] font-[400] text-[#4A4A4A]">{date}</span>
                </div>
            </div>{' '}
            <ExamStatusBadgeContainer status={status} timeLeft={timeLeft} />
            <div className="flex h-[40px] w-[40px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[6px] bg-white transition-colors hover:border hover:border-[#0267FF] hover:bg-gray-50">
                <div className="flex items-center justify-center">
                    <EllipsisVertical className="h-[24px] w-[24px] text-lg" />
                </div>
            </div>
        </div>
    );
};

export default ExamCard;
