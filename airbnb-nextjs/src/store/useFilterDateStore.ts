import { create } from 'zustand';
import { FilterDateState } from '@/interfaces/State';

export const useFilterDateStore = create<FilterDateState>((set) => ({
  time: null,
  setTime: (time) => set({ time })
}));