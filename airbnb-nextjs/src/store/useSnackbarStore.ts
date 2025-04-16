import { create } from 'zustand';
import { CustomerSnackbarState } from '@/interfaces'; 

export const useSnackbarStore = create<CustomerSnackbarState>((set) => ({
  message: '',
  open: false,
  status: 'info',
  showSnackbar: (message, status) => set({ message, status, open: true }),
  closeSnackbar: () => set({ open: false })
}));