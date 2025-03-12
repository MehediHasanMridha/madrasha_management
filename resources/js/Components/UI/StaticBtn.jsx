import { cn } from '../../lib/utils';

const StaticBtn = ({ className, children, ...props }) => {
    return (
        <div
            className={cn(
                'flex w-[162px] cursor-pointer items-center justify-center space-x-[8px] rounded-[8px] bg-[#4891FF] px-[16px] py-[12px] text-[16px] font-[400] text-white',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default StaticBtn;
