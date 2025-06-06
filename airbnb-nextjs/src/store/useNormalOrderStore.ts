import { create } from 'zustand'
import { NormalOrderState } from '@/interfaces'

export const useNormalOrderStore = create<NormalOrderState>((set) => ({
  normal: {},
  order: [],
  setOrder: (order) => set({ order }),
  setNormal: (normal) => set({ normal })
}));