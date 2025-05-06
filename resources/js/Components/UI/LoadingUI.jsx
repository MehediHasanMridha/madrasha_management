import { cn } from '@/lib/utils';
import { ConfigProvider, Spin } from 'antd';

const LoadingUI = ({ className, size = 'default', fullScreen = false, tip = 'Loading...', indicator, ...props }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Spin: {
                        colorPrimary: '#4891FF',
                    },
                },
            }}
        >
            <div className={cn('flex items-center justify-center', fullScreen && 'fixed inset-0 z-50 bg-white/80', className)}>
                <Spin size={size} tip={tip} indicator={indicator} {...props} />
            </div>
        </ConfigProvider>
    );
};

export default LoadingUI;
