import ExamIcon from '@/assets/images/exam.webp';
import ExamActionContainer from '@/Container/Department/Exams/ExamActionContainer';
import ExamStatusBadgeContainer from '@/Container/Department/Exams/ExamStatusBadgeContainer';
import { Link } from '@inertiajs/react';

const ExamCard = ({ exam, department }) => {
    return (
        <Link
            as="button"
            href={route('department.exams_details', { exam_slug: exam.slug, department_slug: department.slug })}
            className="flex w-full cursor-pointer items-center gap-[22px] rounded-[8px] bg-white p-[12px] shadow-[0px_8px_20px_0px_rgba(0,0,0,0.04)]"
        >
            <div className="relative h-[80px] w-[80px] flex-shrink-0 overflow-hidden rounded-[8px]">
                <img src={ExamIcon} draggable="false" alt="Exam placeholder" className="h-full w-full rounded-[8px] object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-[6px]">
                <div className="flex flex-col gap-[12px] sm:flex-row sm:items-center sm:justify-between sm:gap-[24px]">
                    <h3 className="text-[24px] leading-[1.5em] font-[500] text-[#131313]">{exam?.name}</h3>
                </div>
                <div className="flex items-center">
                    <span className="text-[16px] leading-[1.5em] font-[400] text-[#4A4A4A]">
                        {new Date(exam.start_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </div>
            </div>{' '}
            <ExamStatusBadgeContainer status={exam.display_status} timeLeft={exam.time_left} />
            <ExamActionContainer data={exam} />
        </Link>
    );
};

export default ExamCard;
