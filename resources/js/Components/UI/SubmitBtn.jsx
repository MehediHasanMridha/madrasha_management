import { waveform } from 'ldrs';
import { useEffect } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import { cn } from '../../lib/utils';
const SubmitBtn = ({ loadingIndicator = false, className = '', btnText, showIcon = true, ...props }) => {
    useEffect(() => {
        waveform.register();
    }, []);

    return (
        <button type="submit" className={cn('rounded bg-[#1AA2A2] px-4 py-2 text-white', className)} {...props}>
            {loadingIndicator ? (
                <div className="w-24">
                    <l-waveform size="25" stroke="3.5" speed="1" color="white"></l-waveform>
                </div>
            ) : (
                <div className="flex items-center justify-center gap-2">
                    {btnText}
                    {showIcon && <FaArrowCircleRight className="text-2xl text-white" />}
                </div>
            )}
        </button>
    );
};

export default SubmitBtn;
