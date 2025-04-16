import { create } from 'zustand';
import { HostState } from '@/interfaces';

export const useHostedIdStore = create<HostState>((set) => ({
  id: null,
  setHostId: (id) => set({ id })
}));