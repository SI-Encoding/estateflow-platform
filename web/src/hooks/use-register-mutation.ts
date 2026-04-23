import { useMutation } from '@tanstack/react-query'
import { register } from '@/api/auth'
import type { RegisterRequest } from '@/types/auth'

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
  })
}
