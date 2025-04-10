import { create } from 'zustand';
import { createStudentSlice } from './slices/studentSlice';

export const useDepartmentBoundStore = create((...a) => ({
    ...createStudentSlice(...a),
}));
