import { createContext, useContext } from 'react';

export const StudentContext = createContext(null);
export function StudentSectionProvider({ children, value }) {
    return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudentContext() {
    return useContext(StudentContext);
}
