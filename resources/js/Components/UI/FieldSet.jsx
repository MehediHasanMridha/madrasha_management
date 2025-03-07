import { cn } from '../../lib/utils';

const FieldSet = ({ label, children, className = '', labelClassName = '' }) => {
    return (
        <fieldset>
            {label && <legend className={cn('mb-2 text-2xl font-bold', labelClassName)}>{label}</legend>}
            <div className={cn('grid grid-cols-1 gap-2 md:grid-cols-2', className)}>{children}</div>
        </fieldset>
    );
};

export default FieldSet;
