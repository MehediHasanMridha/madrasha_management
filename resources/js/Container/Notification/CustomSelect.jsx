import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

const CustomSelect = ({ options = [], placeholder = 'Select option', value = '', onChange, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (optionValue) => {
        if (onChange) {
            onChange(optionValue);
        }
        setIsOpen(false);
    };

    const selectedOption = options.find(option => option.value === value);

    return (
        <div className={`relative ${className}`}>
            <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-2 border border-[#AFAFAF] rounded-lg bg-white text-left text-[#131313] text-base focus:outline-none focus:border-[#0267FF]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={selectedOption ? 'text-[#131313]' : 'text-[#AFAFAF]'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <IoChevronDown className="w-4 h-4 text-[#4A4A4A]" />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-[#AFAFAF] rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-[#131313] text-base"
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
