import { useLocation } from 'react-router-dom'
import { AuthShell } from '@/components/auth/AuthShell'
import { LoginForm } from '@/components/auth/LoginForm'

export function LoginPage() {
  const location = useLocation()
  const registeredEmail =
    (location.state as { registeredEmail?: string } | null)?.registeredEmail ??
    null

  return (
    <AuthShell
      eyebrow="Login"
      title="Sign in to continue"
      description="Use your EstateFlow credentials to access protected routes and keep your session persisted in the auth store."
      footer={
        registeredEmail ? (
          <span className="text-emerald-200">
            Account created for {registeredEmail}. Sign in to continue.
          </span>
        ) : undefined
      }
    >
      <LoginForm />
    </AuthShell>
  )
}
