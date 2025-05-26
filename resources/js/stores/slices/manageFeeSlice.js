export const manageFeeSlice = (set) => ({
    manageFeeData: { category: null, department: null, class: null },
    setManageFeeData: (newData) =>
        set((state) => ({
            manageFeeData: { ...state.manageFeeData, ...newData }
        })),
});
