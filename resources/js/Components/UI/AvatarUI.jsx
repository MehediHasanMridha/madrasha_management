import { cn } from '@/lib/utils';
import { Avatar } from 'antd';

const AvatarUI = ({ className, ...props }) => {
    return (
        <Avatar
            className={cn('ml-3 cursor-pointer', className)}
            shape="square" // circle, square
            size={40}
            src="https://xsgames.co/randomusers/avatar.php?g=female"
            {...props}
        />
    );
};

export default AvatarUI;
