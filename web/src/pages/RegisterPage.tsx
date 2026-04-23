import { AuthShell } from '@/components/auth/AuthShell'
import { RegisterForm } from '@/components/auth/RegisterForm'

export function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Register"
      title="Create your account"
      description="Fill in the exact backend registration fields and choose a role to start using the platform."
    >
      <RegisterForm />
    </AuthShell>
  )
}
