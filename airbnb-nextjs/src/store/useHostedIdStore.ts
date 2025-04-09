import { create } from 'zustand';
import { HostState } from '@/interfaces/State';

export const useHostedIdStore = create<HostState>((set) => ({
  id: null,
  setHostId: (id) => set({ id })
}));