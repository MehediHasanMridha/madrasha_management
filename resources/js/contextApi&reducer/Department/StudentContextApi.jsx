import { createContext, useContext } from 'react';

export const StudentContext = createContext(null);
export function StudentSectionProvider({ children, value, secondaryValue }) {
    return <StudentContext.Provider value={{ ...value, ...secondaryValue }}>{children}</StudentContext.Provider>;
}

export function useStudentContext() {
    return useContext(StudentContext);
}
