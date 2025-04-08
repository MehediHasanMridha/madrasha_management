import { cn } from '@/lib/utils';
import { FilePenLine, Trash2 } from 'lucide-react';

const Icons = ({ name, className, ...props }) => {
    switch (name) {
        case 'FilePenLine':
            return (
                <FilePenLine
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    className={cn('cursor-pointer text-blue-500 hover:text-blue-700', className)}
                    {...props}
                />
            );
            break;
        case 'Trash2':
            return (
                <Trash2
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    className={cn('cursor-pointer text-red-500 hover:text-red-700', className)}
                    {...props}
                />
            );
            break;
        default:
            break;
    }
};

export default Icons;
