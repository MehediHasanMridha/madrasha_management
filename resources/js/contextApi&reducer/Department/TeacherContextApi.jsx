import { createContext, useContext, useReducer } from 'react';

export const TeachersContext = createContext(null);

const initialStaffs = null; // আপনার প্রাথমিক টাস্ক লিস্ট

const initialCheckedList = [];

function allStaffListReducer(staffs, action) {
    switch (action.type) {
        case 'added':
            return action.staffs;
        case 'loadData':
            return {
                ...action.staffs,
                data: [...staffs.data, ...action.staffs.data.filter((staff) => !staffs.data.some((s) => s.id === staff.id))],
            };
        default:
            throw new Error('Unknown action: ' + action.type);
    }
}
function allStaffCheckListReducer(checkedList, action) {
    switch (action.type) {
        case 'setCheckedList':
            return action.list;
        case 'resetCheckedList':
            return [];
        default:
            throw new Error('Unknown action: ' + action.type);
    }
}

export function TeacherSectionProvider({ children, value }) {
    const [staffs, dispatch] = useReducer(allStaffListReducer, initialStaffs);
    const [checkedList, checkListDispatch] = useReducer(allStaffCheckListReducer, initialCheckedList);

    return <TeachersContext.Provider value={{ staffs, dispatch, checkedList, checkListDispatch, ...value }}>{children}</TeachersContext.Provider>;
}

export function useTeachersContext() {
    return useContext(TeachersContext);
}
