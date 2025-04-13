export const createModalSlice = (set) => ({
    modal: { add: false, edit: false },
    passData: null,
    setModal: (newModal) => {
        if (!newModal.edit && !newModal.add) {
            set({ modal: { ...newModal }, passData: null });
        } else {
            set({ modal: { ...newModal } });
        }
    },
    setPassData: (newPassData) => set({ passData: { ...newPassData } }),
});
