import check from '@/assets/images/check-square.svg';
import clock from '@/assets/images/clock-forward.svg';
import { cn } from '@/lib/utils';
const ExamStatusBadgeContainer = ({ status = 'finished', timeLeft = '30d 20h 22m left' }) => {
    const statusConfig = {
        finished: {
            icon: check,
            text: 'Finished',
            textColor: 'text-[#00A606]',
            borderColor: 'border-[#00A606]',
            bgColor: 'bg-white',
        },
        pending: {
            icon: clock,
            text: timeLeft,
            textColor: 'text-[#0267FF]',
            borderColor: 'border-[#0267FF]',
            bgColor: 'bg-white',
        },
        not_scheduled: {
            icon: null,
            text: 'Date not added',
            textColor: 'text-[#D40000]',
            borderColor: 'border-[#D40000]',
            bgColor: 'bg-white',
        },
    };

    const config = statusConfig[status] || statusConfig.finished;
    return (
        <div className={cn('flex items-center gap-[8px] rounded-[100px] border bg-red-500 px-[12px] py-[6px]', config.borderColor, config.bgColor)}>
            {config.icon && <img src={config.icon} alt="" className="h-[20px] w-[20px]" />}
            <span className={cn('text-[14px] leading-[1.5em] font-[400]', config.textColor)}>{config.text}</span>
        </div>
    );
};

export default ExamStatusBadgeContainer;
