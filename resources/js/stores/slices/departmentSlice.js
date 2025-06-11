export const createDepartmentSlice = (set) => ({
    modal: { add: false, edit: false, data: null },
    setModal: (newModal) => set((state) => ({ modal: { ...state.modal, ...newModal } })),
});
export const createExamDataSlice = (set) => ({
    data: {},
    setData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
    resetData: () => set({ data: {} }),
});
