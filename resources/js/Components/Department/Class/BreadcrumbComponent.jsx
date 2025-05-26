import BreadcrumbUI from '@/Components/UI/BreadcrumbUI';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const BreadcrumbComponent = ({ department = {} }) => {
    return (
        <BreadcrumbUI
            items={[
                {
                    title: (
                        <Link href={route('department.index')} as="button" className="flex cursor-pointer items-center gap-2">
                            <ArrowLeft />
                            {department?.name}
                        </Link>
                    ),
                },
                { title: 'Classes' },
            ]}
        />
    );
};

export default BreadcrumbComponent;
