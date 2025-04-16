import { create } from 'zustand'
import { DialogDateContext } from '@/interfaces'

export const useDialogDateStore = create<DialogDateContext>((set) => ({
  id: null,
  selectDate: (id) => set({ id })
}));