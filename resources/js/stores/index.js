import { create } from 'zustand';
import { createModalSlice } from './slices/modalSlice';


export const useBoundStore = create((set) => ({
    ...createModalSlice(set),
}));
