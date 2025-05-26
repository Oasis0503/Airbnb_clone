import { create } from 'zustand';
import { FilterDateState } from '@/interfaces';

export const useFilterDateStore = create<FilterDateState>((set) => ({
  time: null,
  setTime: (time) => set({ time })
}));