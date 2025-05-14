import { cn } from '@/lib/utils';
import { Tooltip } from 'antd';
import React from 'react';

const TooltipUI = React.forwardRef(
    ({ children, title, placement = 'top', color = '#000', className, overlayClassName, overlayStyle, ...props }, ref) => {
        return (
            <Tooltip
                ref={ref}
                title={title}
                placement={placement}
                color={color}
                arrow={false}
                className={cn('cursor-pointer', className)}
                overlayClassName={cn('rounded-md text-sm', overlayClassName)}
                overlayStyle={{
                    padding: '8px 12px',
                    ...overlayStyle,
                }}
                {...props}
            >
                {children}
            </Tooltip>
        );
    },
);

TooltipUI.displayName = 'TooltipUI';

export default TooltipUI;
