// store/authStore.ts
import { create } from 'zustand';

type AuthState = {
  user: null | { id: string; name: string; email: string };
  setUser: (user: any) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
