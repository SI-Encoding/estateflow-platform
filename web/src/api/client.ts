import axios from 'axios'
import { API_BASE_URL } from '@/api/config'
import { useAuthStore } from '@/store/auth-store'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

  if (token) {
    const headers = config.headers ?? {}

    if ('set' in headers && typeof headers.set === 'function') {
      headers.set('Authorization', `Bearer ${token}`)
    } else {
      ;(headers as Record<string, string>).Authorization = `Bearer ${token}`
    }

    config.headers = headers
  }

  return config
})
