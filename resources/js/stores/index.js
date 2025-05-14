import { create } from 'zustand';
import { getDaysInMonth } from './slices/getDaysInMonth';
import { createModalSlice } from './slices/modalSlice';


export const useBoundStore = create((set) => ({
    ...createModalSlice(set),
    ...getDaysInMonth(set),
}));
