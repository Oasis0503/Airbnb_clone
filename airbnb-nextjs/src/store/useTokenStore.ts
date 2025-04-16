import { create } from 'zustand'
import { TokenState } from '@/interfaces'

export const useTokenStore = create<TokenState>((set) => ({
  token: null,
  email: null,
  setToken: (token) => set({ token }),
  setEmail: (email) => set({ email })
}));