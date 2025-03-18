import { cn } from '@/lib/utils';
import React from 'react';

const Button = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <button
            className={cn(
                'ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});

Button.displayName = 'Button';

export { Button };
