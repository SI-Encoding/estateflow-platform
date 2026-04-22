import { AppLayout } from '@/components/layout/AppLayout'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { useAuthStore } from '@/store/auth-store'

export function App() {
  const token = useAuthStore((state) => state.token)

  return (
    <AppLayout>
      <div className="grid gap-8 xl:grid-cols-[380px_minmax(0,1fr)]">
        <LoginPage />
        <HomePage isAuthenticated={Boolean(token)} />
      </div>
    </AppLayout>
  )
}
