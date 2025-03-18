import { cn } from '@/lib/utils';
import React from 'react';

const Card = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('bg-card text-card-foreground rounded-lg border shadow-sm', className)} {...props} />
));
Card.displayName = 'Card';

const CardContent = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />);
CardContent.displayName = 'CardContent';

export { Card, CardContent };
