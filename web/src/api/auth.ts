import { apiClient } from '@/api/client'
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types/auth'

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', payload)
  return response.data
}

export async function register(payload: RegisterRequest): Promise<void> {
  await apiClient.post('/auth/register', payload)
}
