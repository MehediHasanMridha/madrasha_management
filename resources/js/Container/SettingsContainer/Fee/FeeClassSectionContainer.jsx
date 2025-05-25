import { useDepartmentWiseClass } from '@/hooks/api/class/useDepartmentWiseClass';
import { cn } from '@/lib/utils';
import { useBoundStore } from '@/stores';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';

const FeeClassSectionContainer = () => {
    const { manageFeeData, setManageFeeData } = useBoundStore((state) => state);
    const { data, isLoading, error } = useDepartmentWiseClass(manageFeeData?.department || '');
    if (manageFeeData?.class === null && data?.classes?.length > 0) {
        setManageFeeData({ class: data && data?.classes[0]?.slug });
    }

    useEffect(() => {
        if (manageFeeData?.class) {
            handleFeeData();
        }
    }, [manageFeeData?.class]);

    const handleFeeData = () => {
        router.get(route('fee.fee_index'), manageFeeData, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onSuccess: () => {
                console.log('Data fetched successfully');
            },
        });
    };

    return (
        <div className="w-1/3 pr-6">
            <div className="space-y-4">
                {isLoading && <div>Loading...</div>}
                {error && <div>Error: {error.message}</div>}
                {data && (
                    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">Class List</h2>
                            <ul className="mt-2 space-y-2">
                                {data?.classes.map((classItem) => (
                                    <li
                                        onClick={() => setManageFeeData({ class: classItem.slug })}
                                        key={classItem.id}
                                        className={cn(
                                            'flex cursor-pointer items-center justify-between border-b p-2',
                                            manageFeeData?.class === classItem.slug ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100',
                                        )}
                                    >
                                        <span>{classItem.name}</span>
                                        <span>{classItem.section}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeeClassSectionContainer;
