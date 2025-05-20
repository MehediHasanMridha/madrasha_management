import { cn } from '@/lib/utils';
import { ArrowLeft, Eye, FilePenLine, Trash2 } from 'lucide-react';

const Icons = ({ name, className, ...props }) => {
    switch (name) {
        case 'edit':
            return (
                <FilePenLine
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    className={cn('cursor-pointer text-blue-500 hover:text-blue-700', className)}
                    {...props}
                />
            );
            break;
        case 'delete':
            return (
                <Trash2
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    className={cn('cursor-pointer text-red-500 hover:text-red-700', className)}
                    {...props}
                />
            );
            break;
        case 'back_btn':
            return (
                <ArrowLeft
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    className={cn('cursor-pointer text-black hover:text-gray-500', className)}
                    {...props}
                />
            );
            break;
        case 'eye':
            return (
                <Eye strokeWidth={1.5} absoluteStrokeWidth className={cn('cursor-pointer text-black hover:text-gray-500', className)} {...props} />
            );
            break;
        default:
            break;
    }
};

export default Icons;
