import { HostState } from './../interfaces/State';
import { create } from 'zustand';

export const useHostedIdStore = create<HostState>((set) => ({
  id: null,
  setHostId: (id) => set({ id })
}));