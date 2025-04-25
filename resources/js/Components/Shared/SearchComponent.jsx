import Field from '@/Components/UI/Field';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

const SearchComponent = ({ showBtn, setShowBtn, handleSearch, search, setSearch, handleKeyDown, handleChange, handleReset }) => {
    return (
        <Field className="relative w-full">
            <>
                {!search && <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-[#AFAFAF]" />}
                <input
                    className={cn(
                        'w-full rounded-[8px] border border-solid border-[#AFAFAF] py-[12px] focus:outline-0',
                        search ? 'px-[16px]' : 'px-[44px]',
                    )}
                    type="text"
                    placeholder="Search student"
                    value={search}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                {search && <X className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[#AFAFAF]" onClick={handleReset} />}
            </>
        </Field>
        // <div className="flex w-full items-center space-x-4">
        //     {showBtn && (
        //         <div className="flex items-center space-x-4">
        //             <StaticBtn className="w-20" onClick={handleSearch}>
        //                 Search
        //             </StaticBtn>
        //             <StaticBtn className="w-20" onClick={handleReset}>
        //                 reset
        //             </StaticBtn>
        //         </div>
        //     )}
        // </div>
    );
};

export default SearchComponent;
