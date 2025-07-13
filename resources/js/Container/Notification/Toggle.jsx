import { useState } from 'react';

const Toggle = ({ enabled = false, onChange, className = '' }) => {
    const [isEnabled, setIsEnabled] = useState(enabled);

    const handleToggle = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);
        if (onChange) {
            onChange(newState);
        }
    };

    return (
        <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full border border-[#AFAFAF] transition-colors focus:outline-none ${
                isEnabled ? 'bg-[#0267FF]' : 'bg-[#F2F2F2]'
            } ${className}`}
            onClick={handleToggle}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`}
                style={{
                    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.12)'
                }}
            />
        </button>
    );
};

export default Toggle;
