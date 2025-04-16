import { create } from 'zustand';
import { CurrentListingState } from '@/interfaces';

export const useCurrentStore = create<CurrentListingState>((set) => ({
  current: [],
  setCurrent: (current) => set({ current })
}));