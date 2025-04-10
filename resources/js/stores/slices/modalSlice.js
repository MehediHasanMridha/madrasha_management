export const createModalSlice = (set) => ({
    modal: { add: false, edit: false },
    passData: null,
    setModal: (newModal) => set({ modal: { ...newModal } }),
    setPassData: (newPassData) => set({ passData: { ...newPassData } }),
});
