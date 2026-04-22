export interface AuthUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  expiresAtUtc: string
  user: AuthUser
}
