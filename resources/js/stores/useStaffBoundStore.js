import { create } from 'zustand';
import { createStaffSlice } from './slices/staffSlice';

export const useStaffBoundStore = create((...a) => ({
    ...createStaffSlice(...a),
}));
