import { create } from 'zustand';
import { AlertErrorState } from '@/interfaces'; 

export const useAlertErrorStore = create<AlertErrorState>((set) => ({
  title: '',
  message: '',
  showAlertError: (title, message) => set({ title, message }),
  closeAlertError: () => set({ title: '', message: '' })
}));