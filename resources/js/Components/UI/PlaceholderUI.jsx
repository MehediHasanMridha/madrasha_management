import { cn } from '@/lib/utils';
import * as React from 'react';

// Base placeholder component
const Placeholder = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('animate-pulse rounded bg-gray-200', className)} {...props} />
));
Placeholder.displayName = 'Placeholder';

// Text placeholder component
const PlaceholderText = React.forwardRef(({ className, lines = 3, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
            <Placeholder key={index} className={cn('h-4', index === lines - 1 ? 'w-3/4' : 'w-full')} />
        ))}
    </div>
));
PlaceholderText.displayName = 'PlaceholderText';

// Avatar placeholder component
const PlaceholderAvatar = React.forwardRef(({ className, size = 'default', ...props }, ref) => {
    const sizeClasses = {
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    };

    return <Placeholder ref={ref} className={cn('rounded-full', sizeClasses[size], className)} {...props} />;
});
PlaceholderAvatar.displayName = 'PlaceholderAvatar';

// Card placeholder component
const PlaceholderCard = React.forwardRef(({ className, showAvatar = false, textLines = 3, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-lg border border-gray-200 bg-white p-4', className)} {...props}>
        <div className="space-y-4">
            {showAvatar && (
                <div className="flex items-center space-x-3">
                    <PlaceholderAvatar />
                    <div className="flex-1 space-y-2">
                        <Placeholder className="h-4 w-1/4" />
                        <Placeholder className="h-3 w-1/3" />
                    </div>
                </div>
            )}
            <div className="space-y-2">
                <Placeholder className="h-6 w-3/4" />
                <PlaceholderText lines={textLines} />
            </div>
        </div>
    </div>
));
PlaceholderCard.displayName = 'PlaceholderCard';

// List item placeholder component
const PlaceholderListItem = React.forwardRef(({ className, showAvatar = true, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center space-x-3 p-3', className)} {...props}>
        {showAvatar && <PlaceholderAvatar />}
        <div className="flex-1 space-y-2">
            <Placeholder className="h-4 w-1/2" />
            <Placeholder className="h-3 w-3/4" />
        </div>
    </div>
));
PlaceholderListItem.displayName = 'PlaceholderListItem';

// List placeholder component
const PlaceholderList = React.forwardRef(({ className, items = 5, showAvatar = true, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-1', className)} {...props}>
        {Array.from({ length: items }).map((_, index) => (
            <PlaceholderListItem key={index} showAvatar={showAvatar} />
        ))}
    </div>
));
PlaceholderList.displayName = 'PlaceholderList';

// Table placeholder component
const PlaceholderTable = React.forwardRef(({ className, rows = 5, columns = 4, ...props }, ref) => (
    <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Table header */}
        <div className="grid gap-4 border-b border-gray-200 p-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, index) => (
                <Placeholder key={`header-${index}`} className="h-5 w-3/4" />
            ))}
        </div>
        {/* Table rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
                key={`row-${rowIndex}`}
                className="grid gap-4 border-b border-gray-100 p-4"
                style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            >
                {Array.from({ length: columns }).map((_, colIndex) => (
                    <Placeholder key={`cell-${rowIndex}-${colIndex}`} className="h-4 w-full" />
                ))}
            </div>
        ))}
    </div>
));
PlaceholderTable.displayName = 'PlaceholderTable';

// Form placeholder component
const PlaceholderForm = React.forwardRef(({ className, fields = 4, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-6', className)} {...props}>
        {Array.from({ length: fields }).map((_, index) => (
            <div key={index} className="space-y-2">
                <Placeholder className="h-4 w-1/4" />
                <Placeholder className="h-10 w-full rounded-md" />
            </div>
        ))}
        <div className="pt-4">
            <Placeholder className="h-10 w-32 rounded-md" />
        </div>
    </div>
));
PlaceholderForm.displayName = 'PlaceholderForm';

// Image placeholder component
const PlaceholderImage = React.forwardRef(({ className, aspectRatio = 'square', ...props }, ref) => {
    const aspectRatioClasses = {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
        landscape: 'aspect-[4/3]',
    };

    return <Placeholder ref={ref} className={cn('w-full rounded-lg', aspectRatioClasses[aspectRatio], className)} {...props} />;
});
PlaceholderImage.displayName = 'PlaceholderImage';

// Grid placeholder component
const PlaceholderGrid = React.forwardRef(({ className, items = 6, columns = 3, ...props }, ref) => (
    <div ref={ref} className={cn(`grid gap-4 grid-cols-${columns}`, className)} {...props}>
        {Array.from({ length: items }).map((_, index) => (
            <div key={index} className="space-y-2">
                <PlaceholderImage aspectRatio="landscape" />
                <PlaceholderText lines={2} />
            </div>
        ))}
    </div>
));
PlaceholderGrid.displayName = 'PlaceholderGrid';

// Page placeholder component (combines multiple elements)
const PlaceholderPage = React.forwardRef(({ className, showHeader = true, showSidebar = false, ...props }, ref) => (
    <div ref={ref} className={cn('min-h-screen bg-gray-50', className)} {...props}>
        {showHeader && (
            <div className="border-b border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <PlaceholderAvatar size="lg" />
                        <div className="space-y-2">
                            <Placeholder className="h-6 w-32" />
                            <Placeholder className="h-4 w-24" />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Placeholder className="h-8 w-20 rounded-md" />
                        <Placeholder className="h-8 w-20 rounded-md" />
                    </div>
                </div>
            </div>
        )}
        <div className={cn('flex', showSidebar && 'space-x-6')}>
            {showSidebar && (
                <div className="w-64 border-r border-gray-200 bg-white p-4">
                    <div className="space-y-4">
                        <PlaceholderText lines={1} />
                        <PlaceholderList items={8} showAvatar={false} />
                    </div>
                </div>
            )}
            <div className="flex-1 p-6">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Placeholder className="h-8 w-1/3" />
                        <Placeholder className="h-4 w-2/3" />
                    </div>
                    <PlaceholderCard showAvatar={true} textLines={4} />
                    <PlaceholderGrid />
                </div>
            </div>
        </div>
    </div>
));
PlaceholderPage.displayName = 'PlaceholderPage';

export {
    Placeholder,
    PlaceholderAvatar,
    PlaceholderCard,
    PlaceholderForm,
    PlaceholderGrid,
    PlaceholderImage,
    PlaceholderList,
    PlaceholderListItem,
    PlaceholderPage,
    PlaceholderTable,
    PlaceholderText,
};
