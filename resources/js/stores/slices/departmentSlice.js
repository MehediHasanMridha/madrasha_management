export const createDepartmentSlice = (set) => ({
    dept_modal: { add: false, edit: false },
    dept_passData: null,
    setDept_Modal: (newModal) => set((state) => ({ dept_modal: { ...state.dept_modal, ...newModal } })),
    setDept_PassData: (newPassData) => set((state) => ({ dept_passData: { ...state.dept_passData, ...newPassData } })),
});
