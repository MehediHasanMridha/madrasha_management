import SearchComponent from '@/Components/Shared/SearchComponent';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const StudentSearchContainer = ({ department, setIsLoading }) => {
    const [showBtn, setShowBtn] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (search) {
            router.get(
                route('department.students_show', {
                    department_slug: department.slug,
                    search: search,
                }),
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    onStart: () => {
                        setIsLoading(true);
                    },
                    onFinish: () => {
                        setIsLoading(false);
                    },
                    onError: (errors) => {
                        setIsLoading(false);
                    },
                },
            );
        }
    }, [search]);

    const handleSearch = () => {
        // Implement search logic here
        router.get(
            route('department.students_show', {
                department_slug: department.slug,
                search: search,
            }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onStart: () => {
                    setIsLoading(true);
                },
                onFinish: () => {
                    setIsLoading(false);
                },
                onError: (errors) => {
                    setIsLoading(false);
                },
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
            route('department.students_show', {
                department_slug: department.slug,
            }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onStart: () => {
                    setIsLoading(true);
                },
                onFinish: () => {
                    setSearch('');
                    setShowBtn(false);
                },
                onError: (errors) => {
                    setIsLoading(false);
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

export default StudentSearchContainer;
