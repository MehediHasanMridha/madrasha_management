import { create } from 'zustand';
import { createDepartmentSlice } from './slices/departmentSlice';
import { createModalSlice } from './slices/modalSlice';
import { createStaffSlice } from './slices/staffSlice';
import { createStudentSlice } from './slices/studentSlice';

export const useStaffBoundStore = create((set) => ({
    ...createStaffSlice(set),
}));

export const useDepartmentBoundStore = create((set) => ({
    ...createDepartmentSlice(set),
    ...createStudentSlice(set),
}));

export const useBoundStore = create((set) => ({
    ...createModalSlice(set),
}));
