import { createContext, useContext } from 'react';

export const StaffContext = createContext(null);

export function StaffProvider({ children, value }) {
    return <StaffContext.Provider value={value}>{children}</StaffContext.Provider>;
}

export function useStaffContext() {
    const context = useContext(StaffContext);
    if (!context) {
        throw new Error('useStaffContext must be used within a StaffProvider');
    }
    return context;
}
