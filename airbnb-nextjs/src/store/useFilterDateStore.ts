import { create } from 'zustand';
import { FilterDateState } from '@/interfaces/state';

export const useFilterDateStore = create<FilterDateState>((set) => ({
  time: null,
  setTime: (time) => set({ time })
}));