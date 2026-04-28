import { Navigate, Route, Routes } from 'react-router-dom'
import { RoleProtectedRoute } from '@/components/auth/RoleProtectedRoute'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PublicOnlyRoute } from '@/components/auth/PublicOnlyRoute'
import { AppLayout } from '@/components/layout/AppLayout'
import { AgentDashboardPage } from '@/pages/AgentDashboardPage'
import { CreatePropertyPage } from '@/pages/CreatePropertyPage'
import { EditPropertyPage } from '@/pages/EditPropertyPage'
import { LoginPage } from '@/pages/LoginPage'
import { PropertyDetailsPage } from '@/pages/PropertyDetailsPage'
import { PropertyListPage } from '@/pages/PropertyListPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { SavedPropertiesPage } from '@/pages/SavedPropertiesPage'

export function App() {
  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/properties" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <PropertyListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties/:propertyId"
          element={
            <ProtectedRoute>
              <PropertyDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties/create"
          element={
            <RoleProtectedRoute allowedRoles={['Agent', 'Admin']}>
              <CreatePropertyPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/properties/:propertyId/edit"
          element={
            <RoleProtectedRoute allowedRoles={['Agent', 'Admin']}>
              <EditPropertyPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/saved-properties"
          element={
            <ProtectedRoute>
              <SavedPropertiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard"
          element={
            <RoleProtectedRoute allowedRoles={['Agent', 'Admin']}>
              <AgentDashboardPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  )
}
