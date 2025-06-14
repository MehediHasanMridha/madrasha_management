import { cn } from '@/lib/utils';
import { Clock4, RefreshCcw, SquareCheckBig } from 'lucide-react';
const ExamStatusBadgeContainer = ({ status = 'finished', timeLeft = '30d 20h 22m left' }) => {
    const statusConfig = {
        finished: {
            icon: <SquareCheckBig size={20} color="#00A606" />,
            text: 'Finished',
            textColor: 'text-[#00A606]',
            borderColor: 'border-[#00A606]',
            bgColor: 'bg-white',
        },
        pending: {
            icon: <Clock4 size={20} color="#0267FF" />,
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
        ongoing: {
            icon: <RefreshCcw className="animate-spin" color="#FF8C00" size={20} />,
            text: 'Ongoing',
            textColor: 'text-[#FF8C00]',
            borderColor: 'border-[#FF8C00]',
            bgColor: 'bg-white',
        },
        canceled: {
            icon: null,
            text: 'Canceled',
            textColor: 'text-[#D40000]',
            borderColor: 'border-[#D40000]',
            bgColor: 'bg-white',
        },
    };

    const config = statusConfig[status] || statusConfig.finished;
    return (
        <div className={cn('flex items-center gap-[8px] rounded-[100px] border bg-red-500 px-[12px] py-[6px]', config.borderColor, config.bgColor)}>
            {config.icon && config.icon}
            <span className={cn('text-[14px] leading-[1.5em] font-[400]', config.textColor)}>{config.text}</span>
        </div>
    );
};

export default ExamStatusBadgeContainer;
