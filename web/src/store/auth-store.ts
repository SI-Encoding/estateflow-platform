import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthUser, LoginResponse } from '@/types/auth'

interface AuthState {
  token: string | null
  user: AuthUser | null
  setSession: (session: LoginResponse) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (session) =>
        set({
          token: session.token,
          user: session.user,
        }),
      clearSession: () =>
        set({
          token: null,
          user: null,
        }),
    }),
    {
      name: 'estateflow-auth',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
)
