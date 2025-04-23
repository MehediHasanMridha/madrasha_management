import { Progress } from 'antd';

const ProgressbarUI = ({ percent, type, color, status, showInfo = false, ...props }) => {
    return (
        <Progress
            percent={percent ?? 50}
            status={status ?? 'active'} // active, normal, exception, success
            showInfo={showInfo} // true, false
            size="small" // small, default, large
            // strokeWidth={8} // 0-100
            strokeLinecap="round" // round, square, butt
            trailColor="#e5e5e5" // #e5e5e5
            type={type ?? 'line'} // line, circle, dashboard
            strokeColor={
                color ?? {
                    '0%': '#00bfff', //red
                    '100%': '#00a606',
                }
            }
            {...props}
        />
    );
};

export default ProgressbarUI;
