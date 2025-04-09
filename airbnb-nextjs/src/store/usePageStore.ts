import { PageState } from './../interfaces/State';
import { create } from 'zustand';

export const usePageStore = create<PageState>((set) => ({
  page: 0,
  setPage: (page) => set({ page })
}));