export const createDepartmentSlice = (set) => ({
    dept_modal: { add: false, edit: false },
    dept_passData: null,
    setDept_Modal: (newModal) => set({ modal: { ...newModal } }),
    setDept_PassData: (newPassData) => set({ passData: { ...newPassData } }),
});
