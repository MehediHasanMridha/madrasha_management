export const createStudentSlice = (set) => ({
    modal: { add: false, edit: false }, // Initial state
    passData: null,
    setModal: (newModal) => set({ modal: { ...newModal } }), // Action: Modal সেট করা
    setPassData: (newPassData) => set({ passData: { ...newPassData } }),
});
