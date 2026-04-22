import { useMutation } from '@tanstack/react-query'
import { login } from '@/api/auth'
import { useAuthStore } from '@/store/auth-store'
import type { LoginRequest } from '@/types/auth'

export function useLoginMutation() {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    onSuccess: (session) => {
      setSession(session)
    },
  })
}
