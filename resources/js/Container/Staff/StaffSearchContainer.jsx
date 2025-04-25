import SearchComponent from '@/Components/Shared/SearchComponent';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const StaffSearchContainer = () => {
    const [showBtn, setShowBtn] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (search) {
            router.get(
                route('staff.index'),
                {
                    search,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }
    }, [search]);

    const handleSearch = () => {
        // Implement search logic here
        router.get(
            route('staff.index'),
            {
                search,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value.length > 0) {
            setShowBtn(true);
        } else {
            handleReset();
        }
    };

    const handleReset = () => {
        router.get(
            route('staff.index'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onStart: () => {},
                onFinish: () => {
                    setSearch('');
                    setShowBtn(false);
                },
                onError: (errors) => {
                    setLoading(false);
                },
            },
        );
    };

    return (
        <SearchComponent
            showBtn={showBtn}
            setShowBtn={setShowBtn}
            handleSearch={handleSearch}
            search={search}
            setSearch={setSearch}
            handleKeyDown={handleKeyDown}
            handleChange={handleChange}
            handleReset={handleReset}
        />
    );
};

export default StaffSearchContainer;
