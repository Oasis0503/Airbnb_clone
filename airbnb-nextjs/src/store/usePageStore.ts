import { create } from 'zustand';
import { PageState } from '@/interfaces/State';

export const usePageStore = create<PageState>((set) => ({
  page: 0,
  setPage: (page) => set({ page })
}));