import { cn } from '@/lib/utils';
import { Breadcrumb } from 'antd';
import React from 'react';

const BreadcrumbUI = React.forwardRef(({ items = [], separator = '/', className, homeLink = '/', ...props }, ref) => {
    const finalItems = items.length > 0 ? items : [{ title: <span>Home</span> }];

    return <Breadcrumb ref={ref} separator={separator} items={finalItems} className={cn('text-sm', className)} {...props} />;
});

BreadcrumbUI.displayName = 'BreadcrumbUI';

export default BreadcrumbUI;
