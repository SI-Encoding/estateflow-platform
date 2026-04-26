import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'

interface RoleProtectedRouteProps extends PropsWithChildren {
  allowedRoles: string[]
}

export function RoleProtectedRoute({
  allowedRoles,
  children,
}: RoleProtectedRouteProps) {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/properties" replace />
  }

  return <>{children}</>
}
