export const createDepartmentSlice = (set) => ({
    modal: { add: false, edit: false, data: null },
    setModal: (newModal) => set((state) => ({ modal: { ...state.modal, ...newModal } })),
});
