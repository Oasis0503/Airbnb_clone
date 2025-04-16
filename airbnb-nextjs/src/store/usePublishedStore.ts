import { create } from 'zustand';
import { PublishedState } from '@/interfaces';

export const usePublishedStore = create<PublishedState>((set) => ({
  published: [],
  unpublished: [],
  currentList: [],
  setPublished: (published) => set({ published }),
  setUnpublished: (unpublished) => set({ unpublished }),
  setCurrentList: (currentList) => set({ currentList })
}));