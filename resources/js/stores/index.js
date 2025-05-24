import { create } from 'zustand';
import { createDepartmentSlice } from './slices/departmentSlice';
import { getDaysInMonth } from './slices/getDaysInMonth';
import { manageFeeSlice } from './slices/manageFeeSlice';
import { createModalSlice } from './slices/modalSlice';


export const useBoundStore = create((set) => ({
    ...createModalSlice(set),
    ...getDaysInMonth(set),
    ...manageFeeSlice(set),
}));
export const useDepartmentStore = create((set) => ({
    ...createDepartmentSlice(set)
}));
