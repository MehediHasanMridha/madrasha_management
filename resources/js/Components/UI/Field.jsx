import React from 'react';
import { cn } from '../../lib/utils';

const Field = ({ label, children, htmlFor, error, className = '' }) => {
    const id = htmlFor || getChildId(children);
    return (
        <div className={cn('my-2 flex flex-col', className)}>
            {label && (
                <label htmlFor={id} className="mb-1">
                    {label}
                </label>
            )}
            {children}
            {!!error && <div className="text-red-500">{error.message}</div>}
        </div>
    );
};

const getChildId = (children) => {
    const child = React.Children.only(children);

    if ('id' in child?.props) {
        return child.props.id;
    }
};

export default Field;
